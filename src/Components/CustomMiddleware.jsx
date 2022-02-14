import React from 'react'
import { useEffect } from 'react';

const CustomMiddleware = (props) => {
    useEffect(() => {
      console.log("Checking authentication.....");
    }, [])
    
    return (
        <>
            {props.children}
        </>
    )
}

export default CustomMiddleware