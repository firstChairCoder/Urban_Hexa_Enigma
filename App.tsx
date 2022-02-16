import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";

import Game from "./components/Game";
import { store } from "./redux/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#121212"} style="light" />
        {/* <Text style={{ fontFamily: "Nunito-Bold" }}>Porque no los dos!</Text> */}
        <Game />
      </View>
    </Provider>
  );
}
