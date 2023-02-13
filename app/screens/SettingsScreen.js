import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      style={{
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#000000",
      }}
    >
      <Image
        source={require("../assets/Logofade.png")}
        style={{
          width: 150,
          height: 40,
        }}
      />
    </View>
  );
}
