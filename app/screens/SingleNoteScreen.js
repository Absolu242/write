import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { useDispatch } from "react-redux";
import { pageCount } from "../helper/pageCount";
import { WordCount } from "../helper/wordCount";
import { updateNote } from "../redux/noteSlice";
import json from "../data/db.json";
import NoteServices from "../services/NoteServices";

//function starts
export default function SingleNoteScreen({ navigation, route }) {
  //params
  const { id } = route.params;
  const focusedHeight = Dimensions.get("window").height - 435;
  const initialHeight = Dimensions.get("window").height - 195;
  const _editor = React.createRef();

  //temporary solution, MUST REMOVE
  let objCount = json.notes.length;

  let currentNote = null;
  for (let x = 0; x < objCount; x++) {
    let curitem = json.notes[x];
    if (curitem.id === id) {
      currentNote = curitem;
    }
  }

  //hooks
  const [mode, setMode] = useState("read");
  const [disabled, setDisabled] = useState(false);
  const [writing, setWriting] = useState("");
  const [writingHtml, setWritingHtml] = useState(
    currentNote?.body || "<h1>Title</h1>"
  );
  const dispatch = useDispatch();

  //getting the first words of the note
  const parts = writingHtml.split("</");
  const titleSpliting = parts[0].split(">")[1];
  let resultTitle =
    titleSpliting === undefined
      ? ""
      : titleSpliting.substring(0, 19);

  //handlers

  const data = {
    id,
    title: resultTitle,
    pages: pageCount(WordCount(writingHtml)),
    createdAt: currentNote?.createdAt || "",
    body: writingHtml,
  };

  const saveNote = () => {
    if (resultTitle !== "") {
      dispatch(updateNote({ id, data }));
    } else {
      console.log("please write something");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mode === "edit" ? "black" : "white",
      }}
    >
      {mode === "edit" ? (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingTop: 20,
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                saveNote();
                _editor.current?.enable(!disabled);
                setMode("read");
                setDisabled(!disabled);
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "#4cd964",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>

            <Image
              style={{
                width: 70,
                height: 20,
                marginLeft: 20,
              }}
              source={require("../assets/Logo.png")}
            />
            <Text
              style={{
                fontSize: 17,
                color: "#fff",
              }}
            >
              Share
            </Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingTop: 20,
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={require("../assets/Back.png")} />
            </TouchableOpacity>

            <Image
              style={{
                width: 70,
                height: 20,
                marginLeft: 50,
              }}
              source={require("../assets/logowhite.png")}
            />
            <Text
              style={{
                fontSize: 17,
              }}
            >
              Share
            </Text>
          </View>
        </>
      )}

      {mode === "edit" ? (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height:
                mode === "read" ? initialHeight : focusedHeight,
            }}
          >
            <QuillEditor
              webview={{
                nestedScrollEnabled: true,
              }}
              style={{
                height: initialHeight,
                marginHorizontal: 15,
                marginTop: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              ref={_editor}
              initialHtml={writingHtml}
              onTextChange={(text) => console.log(text)}
              onHtmlChange={({ html }) => setWritingHtml(html)}
            />

            <QuillToolbar
              editor={_editor}
              options="full"
              theme="light"
            />
          </KeyboardAvoidingView>
        </>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            _editor.current?.enable(!disabled);
            _editor.current?.focus();
            setDisabled(!disabled);
            setMode("edit");
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height:
                mode === "read" ? initialHeight : focusedHeight,
              backgroundColor: "red",
            }}
          >
            <QuillEditor
              webview={{
                nestedScrollEnabled: true,
              }}
              style={{
                height: initialHeight,
                marginHorizontal: 15,
                marginTop: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              ref={_editor}
              initialHtml={writingHtml}
              onTextChange={(text) => setWriting(text)}
              onHtmlChange={({ html }) => setWritingHtml(html)}
            />

            <QuillToolbar
              editor={_editor}
              options="full"
              theme="light"
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eaeaea",
    borderRadius: 10,
  },
});
