import React from 'react'
import { AuthServiceType, setAuthType } from '../../../../StateSlice/AuthState';
import { useSelector } from 'react-redux';
import BookedArea from "../Home/BookedArea";
import HomePage from "../Home/HomePage";
import MapArea from "../Home/MapArea";
import PriceArea from "../Home/PriceArea";
import LoginArea from "../Login/LoginArea";
import SignupArea from "../Login/SignupArea";
import CustomDrawer from "../../CustomDrawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
const RootNav = () => {
  const AuthState = useSelector(AuthServiceType);
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const checkAuth = async () => {
    const AuthValue = await AsyncStorage.getItem('Auth')
    if (AuthValue) {
      dispatch(setAuthType({
        AuthVal: true
      }))
    }
  }
  useEffect(() => {
    checkAuth();
  }, [])
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

  const AuthNavigation = () => {
    return (
      <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginArea} />
          <Stack.Screen name="Signup" component={SignupArea} />
        </Stack.Navigator>
      </>
    );
  };

  const AppNavigation = () => {
    return (
      <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Homepage"
            component={HomePageDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Search" component={MapArea} />
          <Stack.Screen name="Price" component={PriceArea} />
          <Stack.Screen name="Booked" component={BookedArea} />
        </Stack.Navigator>
      </>
    );
  };
  return (
    AuthState ? <AppNavigation /> : <AuthNavigation />
  )
}

export default RootNav
