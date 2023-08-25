export interface FlashRoundAnswers {
  answer: string;
  points: number;
}

export interface FlashRound {
  id: string;
  name: string;
  answers1: FlashRoundAnswers[];
  answers2: FlashRoundAnswers[];
  type: number;
  currentRound: number;
  showPoints?: boolean[];
}
