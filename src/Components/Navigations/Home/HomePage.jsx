import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native';

const MainScreenBtns = (props) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("Search")
    }
    return (<TouchableOpacity style={tw`w-1/2 h-full p-2 `} onPress={handlePress}>
        <ImageBackground source={{ uri: props.uri }} style={styles.imageBackground} resizeMode="contain">
            <Text style={{ fontSize: 20, marginTop: 10 }}>{props.name}</Text>
            <FontAwesome name='chevron-circle-right' size={60} style={tw`mb-1`} />
        </ImageBackground>
    </TouchableOpacity>)
}
const HomePage = () => {
    return (
        <View style={styles.container} >
            <View style={tw`w-44 h-32`}>
                <Image source={{ uri: "https://bit.ly/33MuJLn" }} resizeMode='cover' style={tw`w-full h-full`} />
            </View>
            <View style={tw`w-full h-64 mt-3 flex flex-row items-center justify-between`}>

                <MainScreenBtns uri="https://bit.ly/33YmDzJ" name="Get a ride" />
                {/* "" */}
                <MainScreenBtns uri="https://bit.ly/3fLw2NJ" name="Intercity" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white"
    },
    imageBackground: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        elevation: 6,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default HomePage

