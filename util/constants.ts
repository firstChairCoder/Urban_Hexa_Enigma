import { Dimensions } from "react-native";

import type { guess } from "./types";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export const colors = {
  correct: "rgb(106, 170, 100)",
  misplaced: "rgb(201, 180, 88)",
  wrong: "rgb(120, 124, 126)",
  default: "rgb(211, 214, 218)",
  white: "#FFF",
  black: "rgb(18, 18, 19)",
};

export const initialGuesses: guess[] = [
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
  {
    letters: ["", "", "", "", ""],
    matches: ["", "", "", "", ""],
    isComplete: false,
    isCorrect: false,
  },
];

export const answers = [
  "cigar",
  "rebut",
  "sissy",
  "humph",
  "awake",
  "blush",
  "focal",
  "evade",
  "naval",
  "serve",
  "heath",
  "dwarf",
  "model",
  "karma",
  "stink",
  "grade",
];

export const words = [
  "cigar",
  "rebut",
  "sissy",
  "humph",
  "awake",
  "blush",
  "focal",
  "evade",
  "naval",
  "serve",
  "heath",
  "dwarf",
  "model",
  "karma",
  "stink",
  "grade",
];
