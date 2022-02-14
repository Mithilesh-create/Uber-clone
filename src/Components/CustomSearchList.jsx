import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import CustomInputText from './CustomInputText';
import { ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
const CustomSearchList = ({ name, label, placeholder, onInputHandler, ErrorVal, Value, newStyles, Show, handleLocationEvent, SearchList }) => {
    const [ShowSearch, setShowSearch] = useState(false);
    useEffect(() => {
        const search = () => {
            if (Show === name) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        }
        search();
    }, [Show]);
    const handlePress = (data) => {
        handleLocationEvent(name, data.place_name);
    }
    return (
        <View style={[{ width: "80%", position: "relative" }, newStyles]}>
            <CustomInputText
                label={label}
                placeholder={placeholder}
                onChangeShiftHandler={onInputHandler}
                DataValue={Value}
                error={ErrorVal}
            />
            {
                ShowSearch &&

                <View style={{
                    backgroundColor: "white",
                    zIndex: 5,
                    position: "absolute",
                    width: "100%",
                    height: "200%",
                    top: 80,
                    elevation: 2,
                }}>

                    <ScrollView style={{
                        height: "100%",
                        width: "100%",
                        top: 75,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}>
                        {
                            SearchList?.map((search) => {
                                return <TouchableOpacity style={tw`p-1`} key={search.id} onPress={()=>{handlePress(search)}}>
                                    <Text style={{ width: "100%", height: 60 }}>{search.place_name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>

                </View>

            }
        </View>
    );
};

export default CustomSearchList;
