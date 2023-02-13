import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReadModeScreen from "../screens/ReadModeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Image, View } from "react-native";
import { HomeNavigation } from "./HomeNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(21,21,21,0.95)",
          height: 70,
          paddingBottom: 10,
          alignContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="folder" size={30} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        }}
        name="Documents"
        component={HomeNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        }}
        name="Read Mode"
        component={ReadModeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="settings-sharp"
                size={24}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
