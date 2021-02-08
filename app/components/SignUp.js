import React from "react"
import { View, StyleSheet } from "react-native"
import * as Yup from "yup"
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
        <SubmitButton title="Sign Up" />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "red",
    height: 3,
    width: 20,
  },
})
