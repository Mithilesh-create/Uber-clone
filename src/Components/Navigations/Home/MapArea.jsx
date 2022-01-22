import { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, StatusBar, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CustomInputText from '../../CustomInputText';
import CustomButton from '../../CustomButton';
import { useNavigation } from '@react-navigation/native';

const MapArea = () => {
    const Token = "pk.eyJ1IjoibWl0aGlsZXNoMzAwIiwiYSI6ImNreWtjbDJnZzBmdGUyb3VmZ2Z1cm5zOHoifQ.m_QXZVaUJH1zNpi41aee4Q"
    const [StartSearch, setStartSearch] = useState();
    const [Search, setSearch] = useState();
    const [FormData, setFormData] = useState({
        StartLocation: "",
        EndLocation: "",
    });
    const navigation = useNavigation();
    const [ErrorMsg, setError] = useState({})
    // const FetchSearch = async () => {
    //     const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Search}.json?types=place%2Cpostcode%2Caddress&access_token=${Token}`)
    //     const result = await res.json();
    //     setStartSearch(result)
    // }
    const handlePress = () => {
        if (!FormData.StartLocation) {
            setError((prev) => {
                return { ...prev, StartLocation: "Please enter Start Location" };
            });
        }
        if (!FormData.EndLocation) {
            setError((prev) => {
                return { ...prev, EndLocation: "Please enter End Location" };
            });
        }
        if (!FormData.StartLocation.trim().length > 0 && !FormData.EndLocation.trim().length > 0) {
            Alert.alert(
                "Please Add Locations",
                "To book cabs we require your locations",
                [
                    {
                        text: "Okay",
                        style: "cancel",
                    },
                ],
            );

            return
        }
        navigation.navigate("Price")
        setFormData({
            StartLocation: "",
            EndLocation: "",
        });
    };
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
    // useEffect(() => {
    //     FetchSearch();
    // }, [Search]);





    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 19.1590,
                longitude: 72.9986,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} />
            <View style={tw`absolute flex items-center justify-evenly mt-10  top-5 rounded-xl bg-white w-4/5 h-64 ${(ErrorMsg.StartLocation || ErrorMsg.EndLocation) && "h-72"}`}>
                <View style={tw`w-4/5 mt-4`}>
                    <CustomInputText
                        label="Start Location"
                        placeholder="Enter Start Location"
                        onChangeShiftHandler={(val) => {
                            onChangeHandler("StartLocation", val);
                        }}
                        DataValue={FormData.StartLocation}
                        error={ErrorMsg.StartLocation}
                    />
                </View>
                <View style={tw`w-4/5`}>
                    <CustomInputText
                        label="Destination"
                        placeholder="Enter Destination"
                        onChangeShiftHandler={(val) => {
                            onChangeHandler("EndLocation", val);
                        }}
                        DataValue={FormData.EndLocation}
                        error={ErrorMsg.EndLocation}
                    />
                </View>

                <CustomButton
                    label="Book Cab"
                    style={tw`w-4/5 bg-black mb-2`}
                    // style={{
                    //     width: "90%",
                    //     height: 40,
                    //     alignSelf: "center",
                    //     marginBottom: 20,
                    // }}
                    onSubmitData={handlePress}
                />

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