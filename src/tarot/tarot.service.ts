import { Injectable } from '@nestjs/common';
import { TarotInputDto, TarotOutputDto } from './dto/tarot.dto';
import { TarotCardKeywords } from './constant/tarot.constant';
import {
  jobPreText,
  dreamPreText,
  lovePreText,
  studyPreText,
  todayPreText,
} from './constant/preText.constant';
import { getInputText, getTarotAnwerFromOutputText } from './util/tarot.util';
import { ConfigService } from '@nestjs/config';
import { TarotRepository } from './tarot.repository';
import { Tarot } from './schema/tarot.schema';

@Injectable()
export class TarotService {
  constructor(
    private readonly configService: ConfigService,
    private tarotRepository: TarotRepository,
  ) {}

  private readonly REQUEST_URL = this.configService.get('REQUEST_URL');
  private readonly method = 'POST';
  private readonly headers = {
    'X-NCP-CLOVASTUDIO-API-KEY': this.configService.get(
      'X-NCP-CLOVASTUDIO-API-KEY',
    ),
    'X-NCP-APIGW-API-KEY': this.configService.get('X-NCP-APIGW-API-KEY'),
    'Content-Type': 'application/json',
  };
  private readonly bodyInfo = {
    start: '\n[카드해석1]',
    restart: '',
    includeTokens: true,
    topP: 0.8,
    topK: 0,
    maxTokens: 500,
    temperature: 0.5,
    repeatPenalty: 5,
    stopBefore: ['###', '[카드해석1]'],
    includeAiFilters: true,
  };

  async studyTarotResult(tarot: TarotInputDto): Promise<TarotOutputDto> {
    console.log('------study-tarot:---------\n', tarot);
    const answersInput = `${studyPreText}준비하고 있는 시험: ${tarot.firstAnswer}\n시험을 위한 노력: ${tarot.secondAnswer}\n시험에서 얻고 싶은 결과: ${tarot.thirdAnswer}\n`;

    try {
      const response = await fetch(this.REQUEST_URL, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({
          text: getInputText(answersInput, tarot.cards),
          ...this.bodyInfo,
        }),
      }).then((response) => response.json());

      const tarotAnswer = getTarotAnwerFromOutputText(
        1,
        response.result.outputText,
        tarot.cards,
        tarot.cards.map((card) => TarotCardKeywords[card]),
      );

      await this.tarotRepository.create(tarotAnswer);

      return tarotAnswer;
    } catch (err) {
      console.log(err);
    }
  }

  async dreamTarotResult(tarot: TarotInputDto): Promise<TarotOutputDto> {
    console.log('------dream-tarot:---------\n', tarot);
    const answersInput = `${dreamPreText}이루고 싶은 꿈의 종류: ${tarot.firstAnswer}\n꿈을 이루기 위한 노력: ${tarot.secondAnswer}\n꿈을 이루는데 있어 가장 장애물이 되는 요소: ${tarot.thirdAnswer}\n`;

    try {
      const response = await fetch(this.REQUEST_URL, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({
          text: getInputText(answersInput, tarot.cards),
          ...this.bodyInfo,
        }),
      }).then((response) => response.json());

      const tarotAnswer = getTarotAnwerFromOutputText(
        2,
        response.result.outputText,
        tarot.cards,
        tarot.cards.map((card) => TarotCardKeywords[card]),
      );

      await this.tarotRepository.create(tarotAnswer);

      return tarotAnswer;
    } catch (err) {
      console.log(err);
    }
  }

  async jobTarotResult(tarot: TarotInputDto): Promise<TarotOutputDto> {
    console.log('------job-tarot:---------\n', tarot);
    const answersInput = `${jobPreText}취업 준비중인 직무: ${tarot.firstAnswer}\n취업을 위해 하고 있는 노력: ${tarot.secondAnswer}\n취업 준비중에 가장 어려운 부분: ${tarot.thirdAnswer}\n`;

    try {
      const response = await fetch(this.REQUEST_URL, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({
          text: getInputText(answersInput, tarot.cards),
          ...this.bodyInfo,
        }),
      }).then((response) => response.json());

      const tarotAnswer = getTarotAnwerFromOutputText(
        3,
        response.result.outputText,
        tarot.cards,
        tarot.cards.map((card) => TarotCardKeywords[card]),
      );

      await this.tarotRepository.create(tarotAnswer);

      return tarotAnswer;
    } catch (err) {
      console.log(err);
    }
  }

  async loveTarotResult(tarot: TarotInputDto): Promise<TarotOutputDto> {
    console.log('------love-tarot:---------\n', tarot);
    const answersInput = ` ${lovePreText}그 사람과의 첫만남: ${tarot.firstAnswer}\n그 사람에 대한 현재 나의 감정: ${tarot.secondAnswer}\n그 사람과 어떤 관계가 되고싶은지: ${tarot.thirdAnswer}\n`;

    try {
      const response = await fetch(this.REQUEST_URL, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({
          text: getInputText(answersInput, tarot.cards),
          ...this.bodyInfo,
        }),
      }).then((response) => response.json());

      const tarotAnswer = getTarotAnwerFromOutputText(
        0,
        response.result.outputText,
        tarot.cards,
        tarot.cards.map((card) => TarotCardKeywords[card]),
      );

      await this.tarotRepository.create(tarotAnswer);

      return tarotAnswer;
    } catch (err) {
      console.log(err);
    }
  }

  async todayTarotResult(tarot: TarotInputDto): Promise<TarotOutputDto> {
    console.log('------today-tarot:---------\n', tarot);

    try {
      const response = await fetch(this.REQUEST_URL, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({
          text: getInputText(todayPreText, tarot.cards),
          ...this.bodyInfo,
        }),
      }).then((response) => response.json());

      const tarotAnswer = getTarotAnwerFromOutputText(
        4,
        response.result.outputText,
        tarot.cards,
        tarot.cards.map((card) => TarotCardKeywords[card]),
      );

      await this.tarotRepository.create(tarotAnswer);

      return tarotAnswer;
    } catch (err) {
      console.log(err);
    }
  }

  async myTarotHistories(tarotIds: string[]): Promise<Tarot[]> {
    console.log('-----get-tarot------:', tarotIds);
    const tarotPromises = tarotIds.map(async (id) => {
      return await this.tarotRepository.find(id);
    });
    const tarotOutputs: Tarot[] = await Promise.all(tarotPromises);
    return tarotOutputs;
  }
}
