import React, { useEffect } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomItemTile from "../../CustomItemTile";
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from "@react-navigation/native";
import CustomMiddleware from '../../CustomMiddleware';
import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../Data/firebase";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endLocation, startLocation } from "../../../../StateSlice/LocationSlice";
import { useSelector } from "react-redux";
import { CabServiceType } from "../../../../StateSlice/ServiceType";

function PriceArea(props) {
    const navigation = useNavigation();
    const StartLoc = useSelector(startLocation);
    const EndLoc = useSelector(endLocation);
    const CabRideType = useSelector(CabServiceType);
    const randomOtp = Math.ceil(Math.random() * 100000);
    const [CabAvailableList, setCabAvailableList] = useState([])

    const RenderItem = (data) => {
        const handlePress = async () => {
            const FireData = await getDriverDB();

            let ValueFire = {}
            FireData.map((e) => {
                if (data.item.title === e.Cabtitle) {
                    ValueFire = e;
                }
            })
            const userInfoRaw = await AsyncStorage.getItem('Auth');
            const userInfo = JSON.parse(userInfoRaw)

            const PrevBookedCabs = await getPrevBookDB(userInfo.id);
            let checkLast = {}
            if (PrevBookedCabs.length > 0) {
                checkLast = PrevBookedCabs[0]
            }
            if (checkLast?.rideCompleted === false) {
                navigation.navigate("Booked", {
                    doubleBooking: true
                })
                return
            }

            const docRef = doc(db, "Users", userInfo.id);
            const getUserCollectionRef = collection(docRef, "UserBookings")
            const bookedCabId = await addDoc(getUserCollectionRef, {
                CabNumber: ValueFire.CabNumber,
                CabDriver: ValueFire.Driver,
                BookingType: data.item.title,
                OTP: randomOtp,
                From: StartLoc,
                To: EndLoc,
                rideCompleted: false,
                bookedAt: serverTimestamp(),
                RideType: CabRideType,
                fare: data.item?.price
            })
            if (bookedCabId.id) {
                console.log(data);
                const RideInfo = {
                    CabNumber: ValueFire?.CabNumber,
                    CabDriver: ValueFire?.Driver,
                    BookingType: data.item?.title,
                    OTP: randomOtp,
                    From: StartLoc,
                    To: EndLoc,
                    RideType: CabRideType,
                    TimeReq: data.item?.reachtime,
                    Vehicle: ValueFire?.Vehicle,
                    fare: data.item?.price
                }
                navigation.navigate("Booked", {
                    RideInfo
                })
            }
        }
        return (
            <CustomItemTile
                data={data}
                onPress={handlePress}
            />
        );
    };
    const getDataDB = async () => {
        const getCabCollection = collection(db, `/Booking Area`)
        const fetchingData = await getDocs(getCabCollection)
        const valueData = fetchingData.docs.map((e) => ({ ...e.data(), id: e.id }))
        setCabAvailableList(valueData);
    }
    const getDriverDB = async () => {
        const getDriversCollection = collection(db, `/Drivers`)
        const fetchingData = await getDocs(getDriversCollection)
        const valueData = fetchingData.docs.map((e) => ({ ...e.data(), id: e.id }))
        return valueData;
    }
    const getPrevBookDB = async (id) => {
        const getDriversCollection = collection(db, `/Users/${id}/UserBookings`)
        const fetchingData = await getDocs(getDriversCollection)
        const valueData = fetchingData.docs.map((e) => ({ ...e.data(), id: e.id }))
        return valueData;
    }
    const getlatestBookDB = async (id, cabid) => {
        const getDriversCollection = collection(db, `/Users/${id}/UserBookings/${cabid}`)
        const fetchingData = await getDocs(getDriversCollection)
        const valueData = fetchingData.docs.map((e) => ({ ...e.data(), id: e.id }))
        return valueData;
    }
    useEffect(() => {
        getDataDB();
    }, [])

    return (
        <CustomMiddleware>
            <View style={styles.container}>
                <View style={tw`h-20 w-full items-center justify-center border-b border-gray-400`}>
                    <Text style={tw`font-bold text-xl uppercase text-black`}>Cabs Nearby You</Text>
                </View>
                <FlatList
                    keyExtractor={(data) => data.id}
                    data={CabAvailableList}
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
