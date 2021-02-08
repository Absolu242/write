import React, { useState } from "react"
import { Text, Image, StyleSheet, View } from "react-native"
import { colors } from "../config/colors"
import logo from "../assets/Logo.png"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"

export default function AuthScreen() {
  const [whichForm, setWhichForm] = useState("signIn")

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} />
      </View>

      <View style={styles.form}>
        <FormTab label={whichForm} setForm={setWhichForm} />
        <View style={styles.formContent}>
          <FormContent label={whichForm} />
        </View>
      </View>
    </View>
  )
}

const FormTab = ({ label, setForm }) => {
  const active = {
    color: colors.white,
  }
  const nonActive = {
    color: colors.lightDark,
  }

  return (
    <View style={styles.formTab}>
      <Text
        //color={label === "signIn" ? colors.white : colors.darkGrey}
        style={label === "signIn" ? active : nonActive}
        onPress={() => setForm("signIn")}
      >
        Sign In{" "}
      </Text>
      <Text
        style={label === "signUp" ? active : nonActive}
        onPress={() => setForm("signUp")}
      >
        Sign Up
      </Text>
    </View>
  )
}

const FormContent = ({ label }) => {
  switch (label) {
    case "signIn":
      return (
        <>
          <SignIn />
        </>
      )
      break

    case "signUp":
      return (
        <>
          <SignUp />
        </>
      )
      break
    default:
      break
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: colors.black,
  },

  logo: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    top: "20%",
    borderWidth: 1,
    borderBottomColor: "red",
  },
  form: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  formContent: {
    height: "auto",
    padding: 20,
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  formTab: {
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 20,
  },
})
