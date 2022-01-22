import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={() => navigation.navigate("Login")}
                    icon={() => <FontAwesome5 name="sign-out-alt" size={20} />}
                />
            </DrawerContentScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export default CustomDrawer;
