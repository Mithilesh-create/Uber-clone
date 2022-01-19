import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      onPress={props.onSubmitData}
    >
      <View style={styles.buttonView}>
        <Text style={{ color: "white" }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "dodgerblue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CustomButton;
