import React from 'react'
import  secureLocalStorage  from  "react-secure-storage";

const useLocalStorage = () => {

    const setSecureStorage = (key, value) => {
           secureLocalStorage.setItem(key,value)
    }

    const getSecureStorage = (key, value) => {
           secureLocalStorage.getItem(key,value)
    }

    const removeSecureStorage = (key) => {
            secureLocalStorage.removeItem(key)
    }

    return {setSecureStorage, getSecureStorage, removeSecureStorage}
}



export default useLocalStorage