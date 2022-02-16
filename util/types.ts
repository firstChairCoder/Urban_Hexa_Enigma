export type guess = {
  letters: string[];
  matches: matchStatus[];
  isComplete: boolean;
  isCorrect: boolean;
};

export type matchingUsedLetter = {
  [key: string]: matchStatus;
};

export type matchStatus = "correct" | "misplaced" | "wrong" | "";
