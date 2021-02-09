import React from "react"
import { View, StyleSheet, Text } from "react-native"
import * as Yup from "yup"
import { colors } from "../config/colors"
import AppButton from "./AppButton"
import AppForm from "./form/AppForm"
import AppFormField from "./form/AppFormField"
import SubmitButton from "./form/SubmitButton"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(6).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
})

export default function SignUp() {
  return (
    <View>
      <View style={styles.indicator} />
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(info) => console.log(info)}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          name="Name"
          placeholder="Name"
          textContentType="name"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="Email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          name="Password"
          placeholder="Password"
          textContentType="password"
        />
        <View style={styles.line}>
          <Text style={styles.lineText}>OR</Text>
        </View>

        <View style={styles.social}>
          <AppButton
            iconName="twitter"
            iconColor="#55acee"
            color="white"
            txtcolor="lightDark"
            size={12}
            style={styles.socialBtn}
            title="Continu with Twitter"
          />
          <AppButton
            iconName="facebook"
            iconColor="#3b5999"
            color="white"
            txtcolor="lightDark"
            size={12}
            style={styles.socialBtn}
            title="Continu with facebook"
          />
        </View>

        <SubmitButton title="Sign Up" />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    right: 0,
    backgroundColor: colors.lightGrey,
    height: 20,
    width: 19,
    transform: [{ rotateX: "30deg" }, { rotateZ: "45deg" }],
    top: "-6.5%",
    right: "20%",
  },
  line: {
    position: "relative",
    backgroundColor: colors.iconGrey,
    height: 2,
    marginVertical: 20,
  },

  lineText: {
    position: "absolute",
    padding: 10,
    backgroundColor: colors.lightGrey,
    color: colors.darkGrey,
    width: 40,
    left: "45%",
    top: -20,
  },

  social: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
  },

  socialBtn: {
    width: "48%",
  },
})
