import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setAnswer,
  setCurrentGuessIndex,
  setGameEnded,
  setGameWon,
  setGuesses,
  setUsedLetters,
} from "../redux/slices/gameStateSlice";
import { answers, initialGuesses, words } from "../util/constants";
import type { guess } from "../util/types";
import GameBoard from "./GameBoard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Game = () => {
  const { guesses, usedLetters, currentGuessIndex, gameWon, answer } =
    useAppSelector((state) => state.gameState);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFoundKeysOnKeyboard = (guess: any) => {
    const tempUsedLetters = { ...usedLetters };
    guess.letters.forEach((letter: string, index: number) => {
      const keyValue = tempUsedLetters[letter];
      if (!keyValue) {
        tempUsedLetters[letter] = guess.matches[index];
      } else if (keyValue === "correct") {
        return;
      } else if (keyValue && guess.matches[index] === "correct") {
        tempUsedLetters[letter] = "correct";
      } else {
        tempUsedLetters[letter] = guess.matches[index];
      }
    });
    dispatch(setUsedLetters(tempUsedLetters));
  };

  const checkGameEnd = () => {
    const attemptsCount = guesses.filter((guess: guess) => {
      return guess.isComplete;
    }).length;
    if (attemptsCount === 6) {
      dispatch(setGameEnded(true));
    }
  };

  useEffect(() => {
    checkGameEnd();
  }, [currentGuessIndex]);

  const updateGuess = (keyPressed: string, currentGuess: guess) => {
    const currentGuessLetters = [...currentGuess.letters];
    let nextEmptyIndex = currentGuessLetters.findIndex(
      (letter) => letter === ""
    );
    if (nextEmptyIndex === -1) {
      nextEmptyIndex = 5;
    }
    const lastNonEmptyIndex = nextEmptyIndex - 1;
    if (keyPressed !== "<" && keyPressed !== "Enter" && nextEmptyIndex < 5) {
      currentGuessLetters[nextEmptyIndex] = keyPressed;
      const updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      const updatedGuesses = guesses.map((guess, index) => {
        if (index === currentGuessIndex) {
          return updatedGuess;
        } else {
          return guess;
        }
      });
      dispatch(setGuesses([...updatedGuesses]));
    } else if (keyPressed === "<") {
      currentGuessLetters[lastNonEmptyIndex] = "";
      const updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      const updatedGuesses = guesses.map((guess, index) => {
        if (index === currentGuessIndex) {
          return updatedGuess;
        } else {
          return guess;
        }
      });
      dispatch(setGuesses([...updatedGuesses]));
    }
  };

  const checkGuess = (currentGuess: guess) => {
    const currentGuessedWord = currentGuess.letters.join("");
    if (currentGuessedWord.length === 5) {
      if (currentGuessedWord === answer) {
        const matches = ["correct", "correct", "correct", "correct", "correct"];
        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: true,
        };
        const updatedGuesses = guesses.map((guess, index) => {
          if (index === currentGuessIndex) {
            return updatedGuess;
          } else {
            return guess;
          }
        });
        dispatch(setGuesses(updatedGuesses));
        setTimeout(() => {
          // lottieRef.current?.play();
          dispatch(setGameWon(true));
          dispatch(setGameEnded(true));
          handleFoundKeysOnKeyboard(updatedGuess);
        }, 250 * 6);
      } else if (words.concat(answers).includes(currentGuessedWord)) {
        const matches: string[] = [];
        currentGuessedWord.split("").forEach((letter, index) => {
          const leftSlice = currentGuessedWord.slice(0, index + 1);
          const countInLeft = leftSlice
            .split("")
            .filter((item) => item === letter).length;
          const totalCount = answer
            .split("")
            .filter((item) => item === letter).length;
          const nonMatchingPairs = answer
            .split("")
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .filter((item, index) => currentGuessedWord[index] !== item);

          if (letter === answer[index]) {
            matches.push("correct");
          } else if (answer.includes(letter)) {
            if (
              countInLeft <= totalCount &&
              nonMatchingPairs.includes(letter)
            ) {
              matches.push("misplaced");
            } else {
              matches.push("wrong");
            }
          } else {
            matches.push("wrong");
          }
        });

        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: false,
        };

        const updatedGuesses = guesses.map((guess, idx) => {
          if (idx === currentGuessIndex) {
            return updatedGuess;
          } else {
            return guess;
          }
        });

        dispatch(setGuesses(updatedGuesses));
        dispatch(setCurrentGuessIndex(currentGuessIndex + 1));
        handleFoundKeysOnKeyboard(updatedGuess);
      } else {
        // eslint-disable-next-line no-alert
        alert("Not in word list");
      }
    }
  };

  const handleGuess = (keyPressed: string) => {
    const currentGuess = guesses[currentGuessIndex]!;
    if (keyPressed !== "Enter" && !currentGuess.isComplete) {
      updateGuess(keyPressed, currentGuess);
    } else if (keyPressed === "Enter" && !gameWon) {
      checkGuess(currentGuess);
    }
  };

  const resetGameState = () => {
    dispatch(setGuesses([...initialGuesses]));
  };

  const resetGame = () => {
    // lottieRef.current?.reset();
    resetGameState();
    dispatch(setCurrentGuessIndex(0));
    dispatch(setUsedLetters([]));
    dispatch(setGameWon(false));
    dispatch(setGameEnded(false));
    dispatch(setAnswer(answers[Math.floor(Math.random() * answers.length)]));
  };

  return (
    <View style={styles.container}>
      <GameBoard
        handleGuess={handleGuess}
        answer={answer}
        resetGame={resetGame}
      />
    </View>
  );
};

export default Game;
