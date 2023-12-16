export class TarotInputDto {
  readonly firstAnswer: string;
  readonly secondAnswer: string;
  readonly thirdAnswer: string;
  readonly cards: number[];
}

export class TarotOutputDto {
  readonly cardResults: CardResult[];
  readonly overallResult: OverallResult;
}

export interface CardResult {
  keywords: string[];
  description: string;
}

export interface OverallResult {
  summary: string;
  full: string;
}
