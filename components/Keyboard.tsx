import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppSelector } from "../hooks";
import { colors, WIDTH } from "../util/constants";

const styles = StyleSheet.create({
  rowWrapper: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  keyBtn: {
    height: WIDTH / 12 + 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 5,
  },
  key: {
    color: "#FFF",
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
  },
});

const keys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<", "z", "x", "c", "v", "b", "n", "m", "Enter"],
];

interface KeyboardProps {
  handleGuess: (keyPressed: string) => void;
}

const Keyboard = ({ handleGuess }: KeyboardProps) => {
  const { usedLetters } = useAppSelector((state) => state.gameState);
  const handleKeyColor = (key: string) => {
    const letter = usedLetters[key];
    if (letter) {
      if (letter === "correct") {
        return colors.correct;
      } else if (letter === "misplaced") {
        return colors.misplaced;
      } else if (letter === "wrong") {
        return colors.wrong;
      } else {
        return colors.default;
      }
    } else {
      return colors.default;
    }
  };

  return (
    <View>
      {keys.map((row, index) => (
        <View key={index} style={styles.rowWrapper}>
          {row.map((keyboardLetter) => {
            return (
              <Pressable
                key={keyboardLetter}
                style={{
                  ...styles.keyBtn,
                  width:
                    keyboardLetter === "<" || keyboardLetter === "Enter"
                      ? (WIDTH * 3) / 24
                      : WIDTH / 12,
                  backgroundColor: handleKeyColor(keyboardLetter),
                }}
                onPress={() => handleGuess(keyboardLetter)}
              >
                <Text
                  style={{
                    ...styles.key,
                    fontSize: keyboardLetter === "Enter" ? 10 : 18,
                  }}
                >
                  {keyboardLetter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
