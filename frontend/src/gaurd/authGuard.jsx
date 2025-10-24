import React from 'react'
import { Navigate } from 'react-router-dom'
import useLocalStorage from '../customHooks/useLocalStorage'

const AuthGuard = ({children}) => {
     
const {getSecureStorage} = useLocalStorage()

    const authenticated = getSecureStorage(process.env.REACT_APP_STORAGE_KEY)


    if (!authenticated) {
           return <Navigate to={"/"}/>
    }
    
    return   children
}

export default AuthGuard