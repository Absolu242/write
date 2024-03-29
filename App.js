import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

//components
import GlobalScreen from "./app/components/GloablScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AuthScreen from "./app/screens/AuthScreen";
import MainNavigation from "./app/navigation";
//import rootReducer from "./redux/reducers";

import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { store } from "./app/redux/store";

export default function App() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <GlobalScreen>
          <MainNavigation />
          <StatusBar style="auto" />
        </GlobalScreen>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
