import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import BookedArea from "./src/Components/Navigations/Home/BookedArea";
import HomePage from "./src/Components/Navigations/Home/HomePage";
import MapArea from "./src/Components/Navigations/Home/MapArea";
import PriceArea from "./src/Components/Navigations/Home/PriceArea";
import LoginArea from "./src/Components/Navigations/Login/LoginArea";
import SignupArea from "./src/Components/Navigations/Login/SignupArea";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Search" component={MapArea} />
            <Stack.Screen name="Price" component={PriceArea} />
            <Stack.Screen name="Booked" component={BookedArea} />
            <Stack.Screen name="Login" component={LoginArea} />
            <Stack.Screen name="Signup" component={SignupArea} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
