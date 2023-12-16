import { TarotCard, TarotCardKeywords } from '../constant/tarot.constant';
import { CardResult, OverallResult } from '../dto/tarot.dto';
import { nanoid } from 'nanoid';

const parseOutputText = (outputText: string): [string[], string] => {
  const zero = outputText.split('\n[카드해석1]');
  const first = zero[1].split('\n[카드해석2]');
  const second = first[1].split('\n[카드해석3]');
  const third = second[1].split('\n[타로점 결과]\n');
  return [[first[0], second[0], third[0]], third[1]];
};

const getCardResults = (cardDescriptions: string[], cardKeywords: string[]) => {
  return cardDescriptions.map((description, i) => {
    return { keywords: cardKeywords[i].split(','), description };
  });
};

export const getInputText = (answersInput: string, cards: number[]) => {
  const tarotCards = cards.map((n) => TarotCard[n]);
  const tarotKeywords = cards.map((n) => TarotCardKeywords[n]);

  const cardsInput = `첫 번째 카드: ${tarotCards[0]}\n첫 번째 카드 키워드: ${tarotKeywords[0]}\n두 번째 카드: ${tarotCards[1]}\n두 번째 카드 키워드: ${tarotKeywords[1]}\n세 번째 카드: ${tarotCards[2]}\n세 번째 카드 키워드: ${tarotKeywords[2]}\n`;

  return answersInput + cardsInput;
};

export const getTarotAnwerFromOutputText = (
  tarotType: number,
  outputText: string,
  cards: number[],
  tarotKeywords: string[],
): any => {
  const tarotId = nanoid();
  const [cardInterpretations, overall] = parseOutputText(outputText);
  const cardResults: CardResult[] = getCardResults(
    cardInterpretations,
    tarotKeywords,
  );

  const today = new Date();
  const createdAt = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${
    today.getDate() + 1
  }일`;

  const overallParse = overall.split('"');
  const overallResult: OverallResult = {
    summary: overallParse[1],
    full: overallParse[2].trim(),
  };
  return { tarotId, tarotType, cardResults, createdAt, cards, overallResult };
};
