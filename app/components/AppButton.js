import React from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { Zocial } from "@expo/vector-icons"
import { colors } from "../config/colors"

export default function AppButton({
  title,
  onPress,
  color = "black",
  style,
  size,
  txtcolor = "white",
  iconName = "",
  iconColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { backgroundColor: colors[color] }]}
    >
      {iconName !== "" ? (
        <Zocial
          style={styles.icon}
          name={iconName}
          size={15}
          color={iconColor}
        />
      ) : null}

      {
        <Text
          style={[styles.text, { fontSize: size, color: colors[txtcolor] }]}
        >
          {title}
        </Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },

  icon: {
    paddingRight: 5,
  },
  text: {
    color: colors.white,
    fontSize: 15,
  },
})
