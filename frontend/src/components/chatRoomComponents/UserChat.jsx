import React from 'react'
import '../../css/chatCustomerStyle.css'
import "../../css/formStyle.css";
import { useState } from "react"
import { useEffect } from 'react';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SearchIcon from '@mui/icons-material/Search';
import profile from "../../images/user-logo.png"
import TelegramIcon from '@mui/icons-material/Telegram';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import socket from "../SocketIO/SocktetIO";

const Chat = () => {

  const [chatState,setChatState] = useState(false)
  const [selectedChat, setSelectedChat] = useState(false)
  const [chatInformation,setChatInformation] = useState({})
  const [userChat,setUserChat] = useState(false)
  const { handleSubmit, reset, register ,formState} = useForm();
  const notificationRef = useRef(null)
  const [notificationCount,setNotificationCount] = useState(0)
  const [showNotification,setShowNotification] = useState(false)
  const chatBoxRef = useRef(null)

  const handleShowChat = (data) => {
       setChatInformation(data)
       setSelectedChat(true)
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
     

      const   submit = (data) => {
        reset()
        renderMessage({message: data.message, profile : profile},true)
        socket.emit('message',{message: data.message, profile :profile }, true)
        
      }


      const handleShowChatBox = () => {
        setChatState(true)
        setNotificationCount(0)
      }

    

        useEffect(() => {
          
            socket.connect()
            socket.on('send-message', (data) => {
            renderMessage({message: data.message, profile : data.profile},false)
            setNotificationCount((prevState) => prevState + 1)
          
                if (notificationRef.current) {
                     notificationRef.current.innerText = notificationCount
                }
           })



             return () => {
                   socket.off('send-message')
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
    
                                <SearchIcon className="input-icons-left"/>
                                <input type='text' className="input-text input-with-icons" placeholder="Search" />
                  
         
                     </div>
                       <div className='user-chat-contain'>
                          
                          <div className='user-contain' onClick={() => handleShowChat('Dummy')}>
                              <div className='user-chat-profile'>
                                 <img src={profile} alt="" className='chat-user-image'/>
                                          <span className='user-status'></span>
                              </div>
                          <div className='user-chat-information'>
                          <span className='user-chat-name'>Dummy</span>
                         </div>
                
                        </div>
                   
                         </div>
                 </div>
      
                        
                        <div className={ selectedChat ? "chat-block-contain" : "chat-block-contain  minimize-chat "}>
                           <div className='user-chat-block-information'>
                               <div className='user-selected-name'>
                                  <img src={profile} alt="" className='user-chat-profile profile-chat-modify'/>
                                   <span className='user-chat-name user-chat-modify'>Dummy</span>
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
                    
                               <div className='user-history-chat' onClick={() => handleShowChat('Dummy')}>
                                 <div className='user-chat-profile'>
                                 <img src={profile} alt="" className='chat-user-image'/>
                              </div>
                            <div className='user-chat-information user-history-change-flex'>
                                  <span className='user-chat-name'>Dummy</span>
                                  <span className='user-chat-name'>asdasdasd</span>
                            </div>
                          </div>
                       
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