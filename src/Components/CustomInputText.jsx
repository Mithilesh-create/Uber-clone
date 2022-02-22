import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CustomInputText = (props) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{props.label}</Text>
      <View>
        <TextInput
          {...props}
          style={styles.inputArea(props.error)}
          placeholder={props.placeholder}
          onChangeText={props.onChangeShiftHandler}
          value={props.DataValue}
        />
        {props.error && <Text style={{ color: "red" }}>{props.error}</Text>}
        {props.icon ? (
          <TouchableOpacity
            onPress={props.onPressIcon}
            style={styles.inputIcon}
          >
            <Text style={props.iconStyle}>{props.secureTextEntry ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputArea: (error) => {
    return {
      height: 40,
      borderRadius: 5,
      borderColor: error ? "red" : "gray",
      borderWidth: 1,
      marginVertical: 10,
      padding: 10,
    };
  },
  inputIcon: {
    height: 40,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "15%",
    right: "5%",
  },
});
export default CustomInputText;
