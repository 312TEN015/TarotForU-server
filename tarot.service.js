'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TarotService = void 0;
const common_1 = require('@nestjs/common');
const tarot_constant_1 = require('./constant/tarot.constant');
const preText_constant_1 = require('./constant/preText.constant');
const tarot_util_1 = require('./util/tarot.util');
const REQUEST_URL =
  'https://clovastudio.apigw.ntruss.com/testapp/v1/completions/LK-D2';
const method = 'POST';
const headers = {
  'X-NCP-CLOVASTUDIO-API-KEY':
    'NTA0MjU2MWZlZTcxNDJiY9QHVpWQEKYaWtXXAZ6vr0FpKKWl2o8vbclfZDamxKc7N5q/iZmsPX+itNl7eG+yInYAOLLdTyoxVxLL69t+rPgvtoOEhsOVMndJIcRlPGP/DZoMg5pwJUfrGtEOQ44iRsDx8RKAaGMxRuvbvMuA6yrmJ+l4G0Y3GBs0QdHigEFlZBE3l4paYlWGGmPh/aC8iiDQEJxJOc1AatVkmlM5Mws=',
  'X-NCP-APIGW-API-KEY': '4gJ4f6nMiHashub3MFCtJfXwjRW4JKSwYKXS0hmG',
  'X-NCP-CLOVASTUDIO-REQUEST-ID': '229549c38f904ed4aee7284fc4d99bdc',
  'Content-Type': 'application/json',
};
const bodyInfo = {
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
let TarotService = class TarotService {
  async examTarotResult(tarot) {
    console.log('------exam-tarot:---------', tarot);
    const answersInput = `${preText_constant_1.examPreText}준비하고 있는 시험: ${tarot.firstAnswer}\n시험을 위한 노력: ${tarot.secondAnswer}\n시험에서 얻고 싶은 결과: ${tarot.thirdAnswer}\n`;
    const response = await fetch(REQUEST_URL, {
      method,
      headers,
      body: JSON.stringify({
        text: (0, tarot_util_1.getInputText)(answersInput, tarot.cards),
        ...bodyInfo,
      }),
    }).then((response) => response.json());
    return (0, tarot_util_1.getTarotAnwerFromOutputText)(
      response.result.outputText,
      tarot.cards.map((card) => tarot_constant_1.TarotCardDesc[card]),
    );
  }
  async hopeTarotResult(tarot) {
    console.log('------hope-tarot:---------', tarot);
    const answersInput = `${preText_constant_1.hopePreText}이루고 싶은 꿈의 종류: ${tarot.firstAnswer}\n꿈을 이루기 위한 노력: ${tarot.secondAnswer}\n꿈을 이루는데 있어 가장 장애물이 되는 요소: ${tarot.thirdAnswer}\n`;
    const response = await fetch(REQUEST_URL, {
      method,
      headers,
      body: JSON.stringify({
        text: (0, tarot_util_1.getInputText)(answersInput, tarot.cards),
        ...bodyInfo,
      }),
    }).then((response) => response.json());
    return (0, tarot_util_1.getTarotAnwerFromOutputText)(
      response.result.outputText,
      tarot.cards.map((card) => tarot_constant_1.TarotCardDesc[card]),
    );
  }
  async jobTarotResult(tarot) {
    console.log('???');
    console.log('------jog-tarot:---------', tarot);
    const answersInput = `${preText_constant_1.jobPreText}취업 준비중인 직무: ${tarot.firstAnswer}\n취업을 위해 하고 있는 노력: ${tarot.secondAnswer}\n취업 준비중에 가장 어려운 부분: ${tarot.thirdAnswer}\n`;
    const response = await fetch(REQUEST_URL, {
      method,
      headers,
      body: JSON.stringify({
        text: (0, tarot_util_1.getInputText)(answersInput, tarot.cards),
        ...bodyInfo,
      }),
    }).then((response) => response.json());
    console.log(response);
    return (0, tarot_util_1.getTarotAnwerFromOutputText)(
      response.result.outputText,
      tarot.cards.map((card) => tarot_constant_1.TarotCardDesc[card]),
    );
  }
  async loveTarotResult(tarot) {
    console.log('------love-tarot:---------', tarot);
    const answersInput = ` ${preText_constant_1.lovePreText}그 사람과의 첫만남: ${tarot.firstAnswer}\n그 사람에 대한 현재 나의 감정: ${tarot.secondAnswer}\n그 사람과 어떤 관계가 되고싶은지: ${tarot.thirdAnswer}\n`;
    const response = await fetch(REQUEST_URL, {
      method,
      headers,
      body: JSON.stringify({
        text: (0, tarot_util_1.getInputText)(answersInput, tarot.cards),
        ...bodyInfo,
      }),
    }).then((response) => response.json());
    return (0, tarot_util_1.getTarotAnwerFromOutputText)(
      response.result.outputText,
      tarot.cards.map((card) => tarot_constant_1.TarotCardDesc[card]),
    );
  }
  async todayTarotResult(tarot) {
    console.log('------today-tarot:---------', tarot);
    console.log(
      (0, tarot_util_1.getInputText)(
        preText_constant_1.todayPreText,
        tarot.cards,
      ),
    );
    const response = await fetch(REQUEST_URL, {
      method,
      headers,
      body: JSON.stringify({
        text: (0, tarot_util_1.getInputText)(
          preText_constant_1.todayPreText,
          tarot.cards,
        ),
        ...bodyInfo,
      }),
    }).then((response) => response.json());
    return (0, tarot_util_1.getTarotAnwerFromOutputText)(
      response.result.outputText,
      tarot.cards.map((card) => tarot_constant_1.TarotCardDesc[card]),
    );
  }
};
exports.TarotService = TarotService;
exports.TarotService = TarotService = __decorate(
  [(0, common_1.Injectable)()],
  TarotService,
);
//# sourceMappingURL=tarot.service.js.map
