import io from "socket.io-client"
import { v4 } from "uuid";

// const Socket = () => {


   const createUUID = () => {

       if(!localStorage.getItem('socketUUID')) {        
           localStorage.setItem('socketUUID', v4())
       }  
       return  localStorage.getItem('socketUUID')
   }
 
   const socket = io('http://localhost:4000', {
    autoConnect: false,
    query: { userId:createUUID()}
   })


//   return socket
// }

export default socket