import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomItemTile from "../../CustomItemTile";
import { RidesData } from "../../Data/data"
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from "@react-navigation/native";
import CustomMiddleware from '../../CustomMiddleware';

function PriceArea(props) {
    const navigation = useNavigation();
    const randomOtp = Math.ceil(Math.random() * 100000);
    const RenderItem = (data) => {
        const handlePress = () => {
            navigation.navigate("Booked")
        }
        return (
            <CustomItemTile
                data={data}
                onPress={handlePress}
            />
        );
    };
    return (
        <CustomMiddleware>
            <View style={styles.container}>
                <View style={tw`h-20 w-full items-center justify-center border-b border-gray-400`}>
                    <Text style={tw`font-bold text-xl uppercase text-black`}>Cabs Nearby You</Text>
                </View>
                <FlatList
                    keyExtractor={(data) => data.id}
                    data={RidesData}
                    renderItem={RenderItem}
                    style={styles.root}
                />
            </View>
        </CustomMiddleware>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    }
});
export default PriceArea;
