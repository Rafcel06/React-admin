import React from 'react'
import '../../css/chatCustomerStyle.css'
import "../../css/formStyle.css";
import { useState } from "react"
import { useEffect } from 'react';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SearchIcon from '@mui/icons-material/Search';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import socket from "../SocketIO/SocktetIO";
import moment from 'moment';
import useLocalStorage from '../../customHooks/useLocalStorage';


const Chat = () => {

  const [chatState,setChatState] = useState(false)
  const [rooms, setRooms] = useState([])
  const { getSecureStorage, setSecureStorage, removeSecureStorage,clearSecureStorge } = useLocalStorage()
  const [selectedChat, setSelectedChat] = useState(false)
  const [selectHistory,setSelectedHistory] = useState(false)
  const [chatInformation,setChatInformation] = useState({})
  const [userChat,setUserChat] = useState(false)
  const { handleSubmit, reset, register ,formState} = useForm();
  const notificationRef = useRef(null)
  const [notificationCount,setNotificationCount] = useState(0)
  const [showNotification,setShowNotification] = useState(false)
  const [adminProfile,setAdminProfile] = useState('http://localhost:4000/1768388614400%20--%20Super.png')
  const [chatHistory,setChatHistory] = useState([])
  
  const chatBoxRef = useRef(null)

  const handleShowChat = (data) => {  
       localStorage.setItem('Room', data.user_uuid)
       setChatInformation(data)
       resetChatField(data)
       setSelectedChat(true)
       setSelectedHistory((prevState) => !prevState)
       socket.emit('history-chat',{ room : data.user_uuid})
        
  }



    const handleHistoryChat  = (data) => {


        resetChatMatched(data)

        data.forEach((each) => {
           renderMessage(each,each.isAdmin === 1 ? true : false)
        })
  }


        const renderMessage = (data,isOwn) => {

       
             const user_flexing_contain = document.createElement('div')
                   user_flexing_contain.className =  (isOwn ? "admin-chat-flexing-contain" :  "admin-chat-flexing-client-contain")
          
                  
                  const user_Image = document.createElement('img')
                        user_Image.src = data.profile
                        user_Image.className = "user-chat-profile profile-chat-modify"
                        
          
          
                  const user_Chat = document.createElement('div')
                  const user_Node = document.createTextNode(data.message)
                        user_Chat.className = (isOwn ? "user-reply " : 'client-reply')
          
                  user_Chat.appendChild(user_Node)
          
                  user_flexing_contain.appendChild(user_Chat)
                       user_flexing_contain.appendChild(user_Image)
                  chatBoxRef.current.appendChild(user_flexing_contain)
                  
                  chatBoxRef.current.scrollTo({
                  left: 0,
                  top: chatBoxRef.current.scrollHeight,
                  behavior: "smooth"
                });
          

      }
     

      const resetChatField = (data) => {

         if(data.user_uuid === chatInformation.user_uuid) {
                 return
         }

          const message_chat_admin = document.querySelectorAll('.admin-chat-flexing-contain')
          const message_chat_client = document.querySelectorAll('.admin-chat-flexing-client-contain')

          message_chat_admin.forEach((each) => chatBoxRef.current.removeChild(each))
          message_chat_client.forEach((each) => chatBoxRef.current.removeChild(each))
      }


       const resetChatMatched = (data) => {

         if(data.user_uuid === chatInformation.user_uuid) {
                 return
         }

          const message_chat_admin = document.querySelectorAll('.admin-chat-flexing-contain')
          const message_chat_client = document.querySelectorAll('.admin-chat-flexing-client-contain')

          message_chat_admin.forEach((each) => chatBoxRef.current.removeChild(each))
          message_chat_client.forEach((each) => chatBoxRef.current.removeChild(each))
      }




      const  submit = (data) => {
      
        let date = new Date()
        reset()
        renderMessage({message: data.message, profile : adminProfile},true)
        socket.emit('message',{message: data.message, profile :adminProfile,to: chatInformation.user_uuid,  receiver_id : chatInformation.id,dt_message :moment(date, 'YYYY-MM-DD HH:mm:ss'), user_id: getSecureStorage(process.env.REACT_APP_STORAGE_KEY).user.id,isAdmin: 1, room: chatInformation.user_uuid }, true)
       
      }


      const handleShowChatBox = () => {
        setChatState(true)
        setNotificationCount(0)

      }     
        useEffect(() => {            
            socket.connect()
            socket.emit('room','From user')
            socket.on('send-message', (data) => {
            renderMessage({message: data.message, profile : data.profile},false)
           })


           socket.on('send-message-to-admins', (data) => {
                console.log(data)
                 console.log("chat information ",chatInformation)
              if(chatInformation.user_uuid != data.client) {
                console.log('not matcccchhhhh')
                      return
                }
             renderMessage({message: data.message, profile : data.profile},false)
           })

           socket.on('show-rooms', (data) => {
               setRooms(data)
           })

    
             return () => {
              
                   socket.off('send-message')
                   socket.off('send-message-to-admins')
                   socket.off('show-rooms')
                   socket.disconnect()
  
               }
              

      },[])

      useEffect(() => {
               socket.connect()
               socket.on('get-chat-history', (data) => {
                handleHistoryChat(data)
          })

              return () => {
                   socket.off('get-chat-history')
                   socket.disconnect()
  
               }
      },[])




  return (
    <>
 
         <div className={ chatState ? "chat-message-container" : "chat-message-container minimize-chat"} onClick={() => setChatState(false)}>
              <div className='chat-message-contain' onClick={(e) => e.stopPropagation()}>
                <div className='chat-menu'></div>
                 <div className='chat-person-list'>
                     <div className="input-contain-icons">
    
                                <SearchIcon className="input-icons-left" />
                                <input type='text' className="input-text input-with-icons" placeholder="Search" />
                  
         
                     </div>
                       <div className='user-chat-contain'>
                        
                        {
                          rooms.length > 0 ? rooms.map((mapped,index) =>  (  
                            
                                 <div className='user-contain' onClick={() => handleShowChat(mapped)} key={index}>
                                      <div className='user-chat-profile'>
                                        <img src={mapped.image} alt="" className='chat-user-image'/>
                                        <span className='user-status'></span>
                                      </div>
                                      <div className='user-chat-information'>
                                      <span className='user-chat-name'>{mapped.first_name}</span>
                                   </div>
                                </div>
                            ) 
                          ) : null
                        }
                   
                         </div>
                 </div>
      
                        
                        <div className={ selectedChat ? "chat-block-contain" : "chat-block-contain  minimize-chat "}>
                           <div className='user-chat-block-information'>
                               <div className='user-selected-name'>
                                  <img src={chatInformation.image} alt="" className='user-chat-profile profile-chat-modify'/>
                                   <span className='user-chat-name user-chat-modify'>{chatInformation.first_name}</span>
                               </div> 
                               <div className='user-selected-option'>
                                   <SearchIcon className="input-icons"/>
                               </div>
                           </div>
                           <div className='user-chat-block-contain' ref={chatBoxRef}></div>
                           <form className='chat-form-submit' onSubmit={handleSubmit(submit)}>
                              <input type="text" name="" className="admin-send-chat-input"  {...register('message', {
                                required : {
                                  value: true
                                },
                                onChange : () => setUserChat(true)
                              })}/>
                              <button type='submit' className='admin-send-chat-submit'><TelegramIcon/></button>
                           </form>
                      </div> 

                    <div className={ !selectedChat ? "chat-block-contain" : "chat-block-contain  minimize-chat "}>
                    
                           {
                          rooms.length > 0 ? rooms.map((mapped,index) =>  (
                                 <div className='user-contain  flexing-mobile' onClick={() => handleShowChat(mapped)} key={index}>
                                      <div className='user-chat-profile'>
                                        <img src={mapped.image} alt="" className='chat-user-image'/>
                                        <span className='user-status'></span>
                                      </div>
                                      <div className='user-chat-information'>
                                      <span className='user-chat-name'>{mapped.first_name}</span>
                                   </div>
                                </div>
                            )
                          ) : null
                        }
                       
                      </div>
        
                      
              </div>
          </div> 
            <div className={!chatState ? "chat-logo-contain" : "chat-logo-contain minimize-chat"} onClick={handleShowChatBox}>
              { notificationCount > 0 ? <span className={ !chatState ? "chat-notification" : "chat-notification minimize-cha"}    ref={notificationRef}>{notificationCount}</span> :'' }
             <QuestionAnswerRoundedIcon className='chat-icons' />
          </div> 

   
    
    </>
  )
}

export default Chat