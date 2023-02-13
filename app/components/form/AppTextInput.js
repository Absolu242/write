import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { colors } from "../../config/colors";

export default function AppTextInput({
  color,
  bg,
  textAlign,
  textSize,
  ...otherProps
}) {
  return (
    <View
      style={[
        { backgroundColor: bg !== "" ? bg : colors.white },
        styles.container,
      ]}
    >
      <TextInput
        placeholderTextColor={color || colors.lightGrey}
        {...otherProps}
        style={{
          width: "100%",
          textAlign,
          color,
          fontSize: 13,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
});
