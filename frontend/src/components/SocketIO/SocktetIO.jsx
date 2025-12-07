import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import io from "socket.io-client"

// const Socket = () => {
 
   const socket = io(process.env.REACT_APP_BACKEND_URL, {
    autoConnect: false
   })


//   return socket
// }

export default socket