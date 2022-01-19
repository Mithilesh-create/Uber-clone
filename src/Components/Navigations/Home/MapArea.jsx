import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CustomInputText from '../../CustomInputText';
import CustomButton from '../../CustomButton';

const MapArea = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 19.1590,
                longitude: 72.9986,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} />
            <View style={tw`absolute flex items-center justify-evenly mt-10  top-5 rounded-xl bg-white w-4/5 h-48`}>
                <View style={tw`w-4/5`}>
                    <CustomInputText
                        label="Start Location"
                        placeholder="Enter Start Location"
                    />
                </View>
                <View style={tw`w-4/5`}>
                <CustomInputText
                    label="Destination"
                    placeholder="Enter Destination"
                    />
                    </View>
                    {/* <CustomButton label="Search" style={tw`w-4/5 h-10`}/> */}

            </View>
        </View>
    )
}
// https://api.mapbox.com/geocoding/v5/mapbox.places/{name}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoibWl0aGlsZXNoMzAwIiwiYSI6ImNreWtjbDJnZzBmdGUyb3VmZ2Z1cm5zOHoifQ.m_QXZVaUJH1zNpi41aee4Q

export default MapArea
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    map: {
        marginTop: StatusBar.currentHeight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    InputContainer: {
        padding: 20,
    },
});