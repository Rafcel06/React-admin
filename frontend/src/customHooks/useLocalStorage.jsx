import React from 'react'
import  secureLocalStorage  from  "react-secure-storage";

const useLocalStorage = () => {

    const setSecureStorage = (key, value) => {
           secureLocalStorage.setItem(key,value)
    }

    const getSecureStorage = (key) => {
           return secureLocalStorage.getItem(key)
    }

    const removeSecureStorage = (key) => {
            secureLocalStorage.removeItem(key)
    }



    const clearSecureStorge = () => {
       secureLocalStorage.clear()
    }

    return {setSecureStorage, getSecureStorage, removeSecureStorage, clearSecureStorge}
}



export default useLocalStorage