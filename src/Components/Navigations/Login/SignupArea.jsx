import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import CustomButton from "../../CustomButton";
import CustomInputText from "../../CustomInputText";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../Data/firebase";
import bcrypt from "react-native-bcrypt"
const SignupArea = () => {
  const navigation = useNavigation();
  const [ErrorMsg, setError] = useState({});
  const [FormData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
  const [showData, setshowData] = useState(true);

  const getUserCollectionRef = collection(db, `/Users`)


  const handlePress = async () => {
    if (!FormData.userName) {
      setError((prev) => {
        return { ...prev, userName: "Please enter Username" };
      });
    }
    if (!FormData.email) {
      setError((prev) => {
        return { ...prev, email: "Please enter Email" };
      });
    }
    if (!FormData.firstName) {
      setError((prev) => {
        return { ...prev, firstName: "Please enter First name" };
      });
    }
    if (!FormData.lastName) {
      setError((prev) => {
        return { ...prev, lastName: "Please enter Last name" };
      });
    }
    if (!FormData.password || FormData.password.length < 6) {
      setError((prev) => {
        return { ...prev, password: "Please enter min 6 length Password" };
      });
    }
    try {
      const salt = bcrypt.genSaltSync(10)
      var hashedPassword = bcrypt.hashSync(FormData.password, salt);
      await addDoc(getUserCollectionRef, {
        Username: FormData.userName,
        Email: FormData.email,
        Firstname: FormData.firstName,
        Lastname: FormData.lastName,
        Password: hashedPassword,
        createdAt: serverTimestamp(),
      })
      navigation.navigate("Login")
      setFormData({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
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
          Sign Up
        </Text>
        <View style={styles.InputContainer}>
          <CustomInputText
            label="Email Address"
            placeholder="Enter Your Email Address"
            onChangeShiftHandler={(val) => {
              onChangeHandler("email", val);
            }}
            DataValue={FormData.email}
            error={ErrorMsg.email}
          />
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
            label="First Name"
            placeholder="Enter Your First Name"
            onChangeShiftHandler={(val) => {
              onChangeHandler("firstName", val);
            }}
            DataValue={FormData.firstName}
            error={ErrorMsg.firstName}
          />
          <CustomInputText
            label="Last Name"
            placeholder="Enter Your Last Name"
            onChangeShiftHandler={(val) => {
              onChangeHandler("lastName", val);
            }}
            DataValue={FormData.lastName}
            error={ErrorMsg.lastName}
          />
          <CustomInputText
            secureTextEntry={showData}
            label="Password"
            placeholder="Enter Your Password"
            onChangeShiftHandler={(val) => {
              onChangeHandler("password", val);
            }}
            error={ErrorMsg.password}
            icon
            DataValue={FormData.password}
            onPressIcon={() => {
              setshowData(!showData);
            }}
            iconStyle={{ color: "dodgerblue" }}
          />
        </View>
      </View>
      <CustomButton
        label="Sign Up"
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
          <Text style={{ fontSize: 16 }}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Log In
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
export default SignupArea;
