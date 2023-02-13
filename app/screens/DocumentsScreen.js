import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import NoteCard from "../components/NoteCard";
import searchFilterHook from "../../helper/searchFilterHook";

export default function DocumentsScreen({ navigation }) {
  const [search, searchFilterFunction, filteredDataSource] =
    searchFilterHook();

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
      >
        <TouchableOpacity
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
