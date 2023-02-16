import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/NoteCard";
import { generateUUID } from "../helper/generateUUID";
import searchFilterHook from "../helper/searchFilterHook";
import { createNote } from "../redux/noteSlice";

export default function DocumentsScreen({ navigation }) {
  //Current Day
  let date = new Date().toLocaleDateString("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const initialNotedata = {
    id: generateUUID(),
    title: "New Note",
    body: "",
    pages: 1,
    createdAt: date,
  };

  const [
    refreshing,
    search,
    onRefresh,
    searchFilterFunction,
    filteredDataSource,
  ] = searchFilterHook();

  const dispatch = useDispatch();

  const AddNote = () => {
    dispatch(createNote(initialNotedata));
  };

  return (
    <View
      style={{
        backgroundColor: "#000000",
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          alignContent: "center",
          paddingTop: 25,
        }}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{
            width: 75,
            height: 20,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 20,
        }}
      >
        <TextInput
          placeholderTextColor={"#979797"}
          style={{
            width: "100%",
            color: "#fff",
            fontSize: 15,
            backgroundColor: "rgba(255,255,255,0.15);",
            height: 40,
            paddingHorizontal: 20,
            textAlign: "center",
          }}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <TouchableOpacity
          onPress={() => {
            AddNote(),
              navigation.navigate("Note", {
                id: initialNotedata.id,
              });
          }}
          style={{
            width: "48%",
          }}
        >
          <View
            style={{
              height: 230,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.15)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Image source={require("../assets/plus.png")} />
          </View>
        </TouchableOpacity>
        {filteredDataSource.map((note) => (
          <NoteCard
            navigation={navigation}
            note={note}
            key={note.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
