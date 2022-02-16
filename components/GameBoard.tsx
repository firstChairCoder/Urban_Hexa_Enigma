import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppSelector } from "../hooks";
import { colors, HEIGHT, WIDTH } from "../util/constants";
import Box from "./Box";
import Keyboard from "./Keyboard";

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  blocksWrapper: {
    width: WIDTH * 0.9,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  square: {
    width: WIDTH * 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  resultWrapper: {
    width: WIDTH,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  answer: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
  },
  resetBtn: {
    width: 170,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    borderRadius: 10,
  },
  resetText: {
    color: "#FFF",
    fontFamily: "Nunito-Bold",
    fontSize: 20,
  },
});

interface GameBoardProps {
  handleGuess: (keyPressed: string) => void;
  answer: string;
  resetGame: () => void;
}

const GameBoard = ({ handleGuess, answer, resetGame }: GameBoardProps) => {
  const { guesses, gameEnded } = useAppSelector((state) => state.gameState);
  return (
    <View style={styles.container}>
      <View style={styles.blocksWrapper}>
        {guesses.map((guess, index) => (
          <View key={index} style={styles.square}>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {guess.letters.map((letter, index) => {
              return (
                <Box key={index} index={index} letter={letter} guess={guess} />
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.resultWrapper}>
        {gameEnded && (
          <>
            <Text style={styles.answer}>Answer: {answer}</Text>
            <Pressable style={styles.resetBtn} onPress={() => resetGame()}>
              <Text style={styles.resetText}>New Game</Text>
            </Pressable>
          </>
        )}
      </View>

      <Keyboard handleGuess={handleGuess} />
    </View>
  );
};

export default GameBoard;
