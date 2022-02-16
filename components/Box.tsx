import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { colors, WIDTH } from "../util/constants";
import type { guess } from "../util/types";

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 6,
    height: WIDTH / 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // backgroundColor: "lime",
  },
  letter: {
    color: colors.white,
    fontSize: WIDTH / 12,
    fontWeight: "700",
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
  },
});

interface BoxProps {
  guess: guess;
  index: number;
  letter: string;
}

const Box = ({ guess, index, letter }: BoxProps) => {
  const scale = useSharedValue(1);
  const rotateDegree = useSharedValue(0);

  const matchStatus = guess.matches[index];
  function matchColor() {
    "worklet";
    switch (matchStatus) {
      case "correct":
        return colors.correct;
      case "misplaced":
        return colors.misplaced;
      case "wrong":
        return colors.wrong;
      case "":
        return colors.default;
      default:
        return colors.default;
    }
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateDegree.value}deg` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          backgroundColor: matchColor(),
          borderWidth: guess.isComplete ? 0 : 1,
        },
        animatedStyles,
      ]}
      key={index}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  );
};

export default Box;
