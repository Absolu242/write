import { createStackNavigator } from "@react-navigation/stack";
import DocumentsScreen from "../screens/DocumentsScreen";
import SingleNoteScreen from "../screens/SingleNoteScreen";

const Stack = createStackNavigator();

export function HomeNavigation() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={DocumentsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Note"
          component={SingleNoteScreen}
        />
      </Stack.Navigator>
    </>
  );
}
