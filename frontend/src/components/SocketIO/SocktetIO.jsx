import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import io from "socket.io-client"
import { v4} from "uuid";

// const Socket = () => {


   let uuid = v4()
 
   const socket = io(process.env.REACT_APP_BACKEND_URL, {
    autoConnect: false,
    query: { userId: uuid }
   })


//   return socket
// }

export default socket