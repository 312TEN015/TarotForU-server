export class TarotInputDto {
  readonly firstAnswer: string;
  readonly secondAnswer: string;
  readonly thirdAnswer: string;
  readonly cards: number[];
}
export class TarotOutputDto {
  readonly tarotId: string;
  readonly createdAt: Date;
  readonly tarotType: number;
  readonly cards: number[];
  readonly cardResults: CardResult[];
  readonly overallResult: OverallResult;
}

export class TarotIdsDto {
  readonly tarotIds: string[];
}

export interface CardResult {
  keywords: string[];
  description: string;
}
export interface OverallResult {
  summary: string;
  full: string;
}
