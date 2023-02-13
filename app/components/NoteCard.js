import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

export default function NoteCard({ navigation, note }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Note", { id: note.id })}
    >
      <View
        style={{
          width: "48%",
          height: 230,
          borderRadius: 10,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 15,
          padding: 15,
        }}
      >
        <Text
          style={{
            color: "#979797",
            fontSize: 13,
          }}
        >
          {note.createdAt}
        </Text>
        <Text
          style={{
            color: "#000000",
            fontSize: 20,
            textAlign: "center",
            fontFamily: "PlayfairDisplay_700Bold",
          }}
        >
          {note.title}
        </Text>
        <Text
          style={{
            color: "#979797",
            fontSize: 13,
          }}
        >
          {note.pages} {note.pages > 1 ? "Pages" : "Page"}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
