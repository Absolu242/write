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

export default function SingleNoteScreen({ navigation }) {
  const _editor = React.createRef();
  const [mode, setMode] = useState("read");
  const [disabled, setDisabled] = useState(false);

  const focusedHeight = Dimensions.get("window").height - 435;
  const initialHeight = Dimensions.get("window").height - 195;
  const [writing, setWriting] = useState("");

  //   console.log(writing);

  console.log(disabled);
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
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
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
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
      {mode === "edit" ? <></> : <></>}

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
                marginHorizontal: 30,
                marginTop: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              ref={_editor}
              initialHtml={writing}
              onTextChange={(text) => setWriting(text)}
              onHtmlChange={({ html }) => setWriting(html)}
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
            }}
          >
            <QuillEditor
              webview={{
                nestedScrollEnabled: true,
              }}
              style={{
                height: initialHeight,
                marginHorizontal: 30,
                marginTop: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              ref={_editor}
              initialHtml={writing}
              onTextChange={(text) => setWriting(text)}
              onHtmlChange={({ html }) => setWriting(html)}
            />

            <QuillToolbar
              editor={_editor}
              options="full"
              theme="light"
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}

      {/* <TouchableWithoutFeedback
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
            height: mode === "read" ? initialHeight : focusedHeight,
          }}
        >
          <QuillEditor
            webview={{
              nestedScrollEnabled: true,
            }}
            style={{
              height: initialHeight,
              marginHorizontal: 30,
              marginTop: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
            ref={_editor}
            initialHtml={writing}
            onTextChange={(text) => setWriting(text)}
            onHtmlChange={({ html }) => setWriting(html)}
          />

          <QuillToolbar
            editor={_editor}
            options="full"
            theme="light"
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> */}
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
