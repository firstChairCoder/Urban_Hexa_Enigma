import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import type { guess, matchingUsedLetter } from "../../util/types";
import { answers, initialGuesses } from "../../util/constants";

interface GameState {
  answer: string;
  guesses: guess[];
  currentGuessIndex: number;
  usedLetters: matchingUsedLetter;
  gameEnded: boolean;
  gameWon: boolean;
  wrongGuessShake: boolean;
}

const initialState: GameState = {
  answer: answers[Math.floor(Math.random() * answers.length)]!,
  guesses: [...initialGuesses],
  currentGuessIndex: 0,
  usedLetters: {},
  gameEnded: false,
  gameWon: false,
  wrongGuessShake: false,
};

export const gameStateSlice = createSlice({
  name: "GameState",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setGuesses: (state, action) => {
      state.guesses = action.payload;
    },
    setCurrentGuessIndex: (state, action) => {
      state.currentGuessIndex = action.payload;
    },
    setUsedLetters: (state, action) => {
      state.usedLetters = action.payload;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
    setGameEnded: (state, action) => {
      state.gameEnded = action.payload;
    },
    setWrongGuessShake: (state, action) => {
      state.wrongGuessShake = action.payload;
    },
  },
});

export const {
  setAnswer,
  setGuesses,
  setCurrentGuessIndex,
  setUsedLetters,
  setGameWon,
  setGameEnded,
  setWrongGuessShake,
} = gameStateSlice.actions;

export const GameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;
