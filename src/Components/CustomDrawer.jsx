import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image
} from "react-native";
import tw from 'tailwind-react-native-classnames';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "react-native";

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.profileArea}>
                <View style={tw`w-24 h-24 rounded-full bg-white overflow-hidden border`}>
                    <Image source={{ uri: "https://bit.ly/3AzyyQA" }} resizeMode="contain" style={tw`w-full h-full`} />
                </View>
                <Text style={tw`text-xl font-bold mt-3`}>Manoj Saini</Text>
            </View>
            <DrawerContentScrollView {...props} style={{marginTop:-30}}>
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
    },
    profileArea: {
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
        marginTop: StatusBar.currentHeight+10,
    }
});
export default CustomDrawer;
