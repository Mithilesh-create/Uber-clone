import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import tw from 'tailwind-react-native-classnames';
import { Shadow } from "react-native-shadow-2";

function CustomItemTile(props) {
    const { data } = props;
    return (

        <TouchableOpacity style={tw`h-28 mt-2 p-2 items-center justify-center`} onPress={props.onPress}>
            <Shadow distance={8}>
                <View style={{
                    width: "100%", height: "100%", borderRadius: 25, backgroundColor: "white", flexDirection: "row",
                }}>
                    <View style={tw`items-center justify-center mx-2`}>
                        <View style={tw`w-20 h-4/5`}>
                            <Image source={{ uri: data.item.srcimg }} resizeMode="contain" style={tw`w-full h-full rounded-full`} />
                        </View>
                        <View style={{ flex: 1, marginTop: -10 }}>
                            <Text>{data.item.reachtime} mins</Text>
                        </View>
                    </View>
                    <View style={{ width: "50%", justifyContent: "center" ,marginLeft:2}}>
                        <Text style={tw`text-lg font-bold`}>{data.item.title}</Text>
                        <Text style={tw`text-xs mt-1 text-gray-700`}>{data.item.description}</Text>
                    </View>
                    <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={tw`text-base font-bold`}>₹{data.item.price}</Text>
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>

    );
}

export default CustomItemTile;
