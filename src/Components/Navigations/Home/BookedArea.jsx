import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, StatusBar, Text, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Shadow } from "react-native-shadow-2";
import CustomMiddleware from '../../CustomMiddleware';

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={tw`w-80 h-80 bg-blue-500 rounded-full overflow-hidden`}>
                <Image source={{ uri: "https://bit.ly/340N6MS" }} resizeMode="contain" style={tw`w-full h-full`} />
            </View>
        </View>
    )
}
const randomOtp = Math.ceil(Math.random() * (99999 - 10000)) + 10000;
const SuccessMessage = () => {
    return (
        <CustomMiddleware>
            <View style={styles.successContainer}>
                <View style={tw`w-56 h-56 rounded-full overflow-hidden`}>
                    <Image source={{ uri: "https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif" }} resizeMode="cover" style={tw`w-full h-full`} />
                </View>

                <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                    <View style={{ height: "15%", width: "100%", }}>
                        <Text style={tw`font-bold text-2xl text-center`}>Congratulations! Your ride is confirmed.</Text>
                    </View>

                    <View style={{ height: "30%", alignItems: "center", justifyContent: "center" }}>
                        <View style={tw`w-14 h-14 rounded-full overflow-hidden border`}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png" }} resizeMode="cover" style={tw`w-full h-full`} />
                        </View>
                        <View>
                            <Text style={tw`font-bold my-2 text-lg text-center`}>You are riding with Mithilesh Sharma</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`h-24 p-2 items-center justify-center`}>
                        <Shadow distance={15}>
                            <View style={{
                                width: "100%", height: "100%", borderRadius: 25, backgroundColor: "#98FF98", flexDirection: "row",
                            }}>

                                <View style={{ width: "50%", justifyContent: "center", marginLeft: 2 }}>
                                    <Text style={tw`text-lg font-bold text-center text-black`}>{randomOtp}</Text>
                                    <Text style={tw`text-xs mt-1 text-gray-700 text-center`}>Start OTP</Text>
                                </View>
                            </View>
                        </Shadow>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`h-28 mt-2 p-2 items-center justify-center`}>
                        <Shadow distance={15}>
                            <View style={{
                                width: "100%", height: "100%", borderRadius: 25, backgroundColor: "white", flexDirection: "row",
                            }}>
                                <View style={tw`items-center justify-center mx-2`}>
                                    <View style={tw`w-20 h-4/5`}>
                                        <Image source={{ uri: "https://bit.ly/3fLQEW7" }} resizeMode="contain" style={tw`w-full h-full rounded-full`} />
                                    </View>
                                    <View style={{ flex: 1, marginTop: -10 }}>
                                        <Text>2 mins</Text>
                                    </View>
                                </View>
                                <View style={{ width: "50%", justifyContent: "center", marginLeft: 2 }}>
                                    <Text style={tw`text-lg font-bold`}>MH0414141</Text>
                                    <Text style={tw`text-xs mt-1 text-gray-700`}>Wagon R</Text>
                                </View>
                                <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={tw`text-base font-bold`}>₹56</Text>
                                </View>
                            </View>
                        </Shadow>
                    </TouchableOpacity>

                </View>
            </View>
        </CustomMiddleware>
    )
}
const ErrorMessage = () => {
    return (
        <CustomMiddleware>
            <View style={styles.successContainer}>
                <View style={tw`w-80 h-80 rounded-full overflow-hidden`}>
                    <Image source={{ uri: "https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif" }} resizeMode="cover" style={tw`w-full h-full`} />
                </View>

                <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                    <View style={{ height: "15%", width: "100%", }}>
                        <Text style={tw`font-bold text-2xl text-center`}>Sorry! but you have already booked one ride</Text>
                    </View>

                    <View style={{ height: "30%", alignItems: "center", justifyContent: "center" }}>

                        <View>
                            <Text style={tw`font-bold my-2 text-lg text-center`}>Please complete your previous journey to book again</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`h-24 p-2 items-center justify-center`}>
                        <Shadow distance={15}>
                            <View style={{
                                width: "100%", height: "100%", borderRadius: 25, backgroundColor: "#9f98ff", flexDirection: "row",
                            }}>

                                <View style={{ width: "50%", justifyContent: "center", marginLeft: 2 }}>
                                    <Text style={tw`text-lg font-bold text-center text-white`}>GO BACK</Text>
                                </View>
                            </View>
                        </Shadow>
                    </TouchableOpacity>

                </View>
            </View>
        </CustomMiddleware>
    )
}
const BookedArea = () => {
    const [LoadedData, setLoadedData] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoadedData(true);
        }, 1000);
    }, []);

    return (
        LoadedData ? <SuccessMessage /> : <Loading />
    )
}

export default BookedArea

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    successContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "white",
        alignItems: "center",
    }
})
