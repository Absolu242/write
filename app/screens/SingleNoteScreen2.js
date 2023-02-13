import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import {
  defaultActions,
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import RenderHtml from "react-native-render-html";

import EditorScreen from "../components/EditorComponent";

import notes from "../data/data";

export default function SingleNoteScreen({ navigation, route }) {
  const { id } = route.params;

  const note = notes.filter((note) => note.id === id)[0];
  const [mode, setMode] = useState("edit");
  const [writing, setWriting] = useState("");

  const { width } = useWindowDimensions();

  const focusedHeight = Dimensions.get("window").height - 400;
  const initialHeight = Dimensions.get("window").height - 195;

  const richText = React.useRef();

  const tagsStyles = {
    p: {
      whiteSpace: "normal",
    },
    a: {
      color: "green",
    },
    h1: {
      color: "green",
      fontFamily: "PlayfairDisplay_700Bold",
    },
  };

  console.log(writing);

  const mockWriting = `
  <div>cool ce que je vois aujpourdh'hui</div>
  <h1>good morning&nbsp;</h1><div><a href="google.com">google.com</a><br></div><div><br></div><div><ul><li>one</li><li>two&nbsp;</li><li>3</li></ul><div><b>trop bien</b></div></div><div><b>opopopopopopopopipijkkbnbxnvcxvcxbvcbzvbzvxzvbvbvcbxvcbxvnbnbvmnmxcbnxbcnxbvcnzbznvxbvcbxvcnxvbnxbvcnxvcnzvznzbxznbxznvxnzvcnzvcnzxvznvxznvxnzxnzvxnvcnznzvnbxvnnnvbbnnnbxnzbxnnbnnnbnbbnbnbnhjhjdhfjdhhjshsjdhjhj shjhdgjsgfjf</b></div>`;
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
            <TouchableOpacity onPress={() => setMode("read")}>
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
      <ScrollView
        style={{
          padding: 30,
        }}
      >
        <TouchableOpacity onPress={() => setMode("edit")}>
          {mode === "edit" ? (
            <>
              <KeyboardAvoidingView
                behavior={
                  Platform.OS === "ios" ? "position" : "height"
                }
                style={{ flex: 1 }}
              >
                <RichEditor
                  initialFocus="false"
                  containerStyle={{
                    borderRadius: 10,
                  }}
                  style={{
                    minHeight: initialHeight,
                  }}
                  onFocus={(state) => console.log(state)}
                  ref={richText}
                  onChange={(text) => setWriting(text)}
                  initialContentHTML={writing !== "" ? writing : ""}
                />
              </KeyboardAvoidingView>
            </>
          ) : (
            <>
              <RenderHtml
                baseStyle={{
                  flex: 1,
                  minHeight: initialHeight,
                  fontSize: 20,
                  fontFamily: "PlayfairDisplay_700Bold",
                }}
                source={{
                  html: writing,
                }}
                tagsStyles={tagsStyles}
                contentWidth={width}
              />
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: initialHeight,
        }}
      >
        {mode === "edit" && (
          <>
            <RichToolbar
              editor={richText}
              actions={[
                ...defaultActions,
                actions.insertOrderedList,
                actions.checkboxList,
                actions.heading1,
                actions.undo,
                actions.redo,
                //actions.insertImage,
              ]}
              iconMap={{
                [actions.heading1]: ({ tintColor }) => (
                  <Text style={[{ color: tintColor }]}>H1</Text>
                ),
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  h1: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
});
