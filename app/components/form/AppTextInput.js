import React from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { colors } from "../../config/colors"

export default function AppTextInput({ ...otherProps }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={colors.lightGrey}
        style={colors.black}
        {...otherProps}
        style={{
          position: "relative",
          width: "100%",
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 3,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
})
