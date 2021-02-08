import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { colors } from "../config/colors"
import logo from "../assets/Logo.png"
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
  },
})
