import React from "react";

import {
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  View,
} from "react-native";

export default function GlobalScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //paddingTop:Constant.cuurentHight
    flex: 1,
  },

  view: {
    flex: 1,
  },
});
