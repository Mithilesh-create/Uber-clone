import React from 'react'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthType } from '../../StateSlice/AuthState';
import { useDispatch } from 'react-redux';
const CustomMiddleware = (props) => {
    const dispatch = useDispatch();
    const checkAuth = async () => {
        const AuthValue = await AsyncStorage.getItem('Auth')
        if (!AuthValue) {
            dispatch(setAuthType({
                AuthVal: false
            }))
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <>
            {props.children}
        </>
    )
}

export default CustomMiddleware