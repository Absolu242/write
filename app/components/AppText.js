import React from "react"
import { Text } from "react-native"

import { colors } from "../config/colors"

export default function AppText({ children, style, ...othersProps }) {
  return (
    <Text style={[colors.black, style]} {...othersProps}>
      {children}
    </Text>
  )
}
