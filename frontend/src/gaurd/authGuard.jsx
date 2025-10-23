import React from 'react'
import { Navigate } from 'react-router-dom'

const authGuard = ({children}) => {
     

    const authenticated = true


    if (!authenticated) {
           return <Navigate to={"/"}/>
    }
    
    return   children
}

export default authGuard