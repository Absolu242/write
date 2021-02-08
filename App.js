import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import AppTabNav from "./app/components/AppTabNav"
import GlobalScreen from "./app/components/GloablScreen"
import WelcomeScreen from "./app/screens/WelcomeScreen"
import AuthScreen from "./app/screens/AuthScreen"

export default function App() {
  return (
    <GlobalScreen>
      <AuthScreen />
    </GlobalScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
