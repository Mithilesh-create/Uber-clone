import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import BookedArea from "./src/Components/Navigations/Home/BookedArea";
import HomePage from "./src/Components/Navigations/Home/HomePage";
import MapArea from "./src/Components/Navigations/Home/MapArea";
import PriceArea from "./src/Components/Navigations/Home/PriceArea";
import LoginArea from "./src/Components/Navigations/Login/LoginArea";
import SignupArea from "./src/Components/Navigations/Login/SignupArea";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomDrawer from "./src/Components/CustomDrawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const HomePageDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitle: "", headerShadowVisible: false }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={{
            drawerIcon: () => {
              return <FontAwesome5 name="car" size={20} />;
            },
          }}
        />
      </Drawer.Navigator>
    );
  };
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Homepage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Homepage"
              component={HomePageDrawer}
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
