import { useState } from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, StatusBar, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CustomButton from '../../CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomSearchList from '../../CustomSearchList';
import { useDispatch } from 'react-redux';
import { setEndLoc, setStartLoc } from '../../../../StateSlice/LocationSlice';
import CustomMiddleware from '../../CustomMiddleware';
const MapArea = () => {
    const Token = "pk.eyJ1IjoibWl0aGlsZXNoMzAwIiwiYSI6ImNreWtjbDJnZzBmdGUyb3VmZ2Z1cm5zOHoifQ.m_QXZVaUJH1zNpi41aee4Q"
    const [ShowSearch, setShowSearch] = useState("");
    const [FormData, setFormData] = useState({
        StartLocation: "",
        EndLocation: "",
    });
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ErrorMsg, setError] = useState({})
    const [LocationList, setLocationList] = useState([])
    const FetchSearch = async (Search) => {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Search}.json?types=place%2Cpostcode%2Caddress&access_token=${Token}`)
        const result = await res.json();
        setLocationList(result.features)
    }
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
        dispatch(setStartLoc({
            startLocation: FormData.StartLocation
        }))
        dispatch(setEndLoc({
            endLocation: FormData.EndLocation
        }))
        navigation.navigate("Price")
        setFormData({
            StartLocation: "",
            EndLocation: "",
        });
    };


    const onChangeHandler = async (name, value) => {
        setShowSearch(name);
        setFormData({ ...FormData, [name]: value });
        await FetchSearch(value)
        if (value !== "") {
            setError((prev) => {
                return { ...prev, [name]: null };
            });
        } else {
            setError((prev) => {
                return { ...prev, [name]: "This field is required" };
            });
            setShowSearch(null);
        }
    };

    const handleSearchLocationShow = (name, search) => {
        setFormData({ ...FormData, [name]: search });
        setShowSearch(null);
    }

    return (
        <CustomMiddleware>

            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={{
                    latitude: 19.1590,
                    longitude: 72.9986,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />

                <View style={tw`absolute flex items-center justify-evenly top-5 rounded-xl bg-white w-full mt-10 h-64 ${(ErrorMsg.StartLocation || ErrorMsg.EndLocation) && "h-72"}`}>

                    <CustomSearchList name="StartLocation" label="Start Location" placeholder="Enter Start Location" onInputHandler={(val) => {
                        onChangeHandler("StartLocation", val);
                    }} Value={FormData.StartLocation} ErrorVal={ErrorMsg.StartLocation} newStyles={{ marginTop: 20 }} handleLocationEvent={handleSearchLocationShow} Show={ShowSearch} SearchList={LocationList} />

                    <CustomSearchList name="EndLocation" label="Destination" placeholder="Enter Destination" onInputHandler={(val) => {
                        onChangeHandler("EndLocation", val);
                    }} Value={FormData.EndLocation} ErrorVal={ErrorMsg.EndLocation} handleLocationEvent={handleSearchLocationShow} Show={ShowSearch} SearchList={LocationList} />


                    <CustomButton
                        label="Book Cab"
                        style={tw`w-4/5 bg-black mb-2`}
                        onSubmitData={handlePress}
                    />

                </View>
            </View>
        </CustomMiddleware>

    )
}

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