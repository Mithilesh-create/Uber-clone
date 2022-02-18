import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuthType } from "../../../../StateSlice/AuthState";
import CustomButton from "../../CustomButton";
import CustomInputText from "../../CustomInputText";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Data/firebase";
import bcrypt from "react-native-bcrypt"

const LoginArea = () => {
  const navigation = useNavigation();
  const [FormData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [ErrorMsg, setError] = useState({})
  const [showData, setshowData] = useState(true);
  const dispatch = useDispatch();
  const onChangeHandler = (name, value) => {
    setFormData({ ...FormData, [name]: value });
    if (value !== "") {
      setError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };
  const getDataDB = async () => {
    const getUserCollection = collection(db, `/Users`)
    const fetchingData = await getDocs(getUserCollection)
    const valueData = fetchingData.docs.map((e) => ({ ...e.data(), id: e.id }))
    return valueData;
  }

  const handlePress = async () => {
    try {
      if (!FormData.userName) {
        setError((prev) => {
          return { ...prev, userName: "Please enter correct Username" };
        });
        return
      }
      if (!FormData.password || FormData.password.length < 6) {
        setError((prev) => {
          return { ...prev, password: "Please enter correct Password" };
        });
        return
      }
      const FireData = await getDataDB();
      let ValueFire = {}
      FireData.map((e) => {
        if (FormData.userName == e.Username) {
          ValueFire = e;
        }
      })

      var hashedPassword = bcrypt.compareSync(FormData.password, ValueFire?.Password);
      if (hashedPassword) {
        dispatch(setAuthType({
          AuthVal: true
        }))
        await AsyncStorage.setItem('Auth', ValueFire)
        setFormData({
          userName: "",
          password: "",
        });
      } else {
        setError((prev) => {
          return { ...prev, password: "Please enter correct Password" };
        });
        return
      }

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView style={styles.root}>
      <View style={styles.ImageContainer}>
        <Image
          source={{ uri: "https://bit.ly/3fAwhLp" }}
          style={{ width: "50%", height: "50%", resizeMode: "contain" }}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          UBER
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            marginVertical: 10,
            color: "dodgerblue",
          }}
        >
          Sign In
        </Text>
        <View style={styles.InputContainer}>
          <CustomInputText
            label="User Name"
            placeholder="Enter Your User Name"
            onChangeShiftHandler={(val) => {
              onChangeHandler("userName", val);
            }}
            DataValue={FormData.userName}
            error={ErrorMsg.userName}
          />
          <CustomInputText
            secureTextEntry={showData}
            label="Password"
            placeholder="Enter Your Password"
            onChangeShiftHandler={(val) => {
              onChangeHandler("password", val);
            }}
            icon
            DataValue={FormData.password}
            onPressIcon={() => {
              setshowData(!showData);
            }}
            iconStyle={{ color: "dodgerblue" }}
            error={ErrorMsg.password}
          />
        </View>
      </View>

      <CustomButton
        label="Login"
        style={{
          width: "90%",
          height: 40,
          alignSelf: "center",
          marginBottom: 20,
        }}
        onSubmitData={handlePress}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  InputContainer: {
    padding: 20,
  },
  ImageContainer: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
  },
});
export default LoginArea;
