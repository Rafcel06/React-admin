import React from "react";
import { useState } from "react";
import "../../css/chatCustomerStyle.css";
import "../../css/customHooks.css";
import "../../css/formStyle.css";
import TelegramIcon from '@mui/icons-material/Telegram';
import SearchIcon from "@mui/icons-material/Search";
import profile from "../../images/user-logo.png";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import socket from "../SocketIO/SocktetIO";
import useAlert from "../../customHooks/useAlert";
import { useEffect } from "react";
import useGenerateAvatar from "../../customHooks/useGenerateAvatar";

const ClientChat = () => {

  const [userChat,setUserChat] = useState(false)
  const { generateAvatar} = useGenerateAvatar()
  const { RenderAlert, showAlertElement, hideAlertElement } = useAlert()
  const [sendChatState,setSendChatState] = useState(false)
  const { handleSubmit, reset, register ,formState} = useForm();
  const [profileImg,setProfileImg] = useState()
  const chatBoxRef = useRef(null)


   const renderMessage = (data,isOwn) => {



        const user_flexing_contain = document.createElement('div')
              user_flexing_contain.className =  (isOwn ? "user-chat-flexing-contain" :  "user-chat-flexing-client-contain")

        
        const user_Image = document.createElement('img')
              user_Image.src = data.profile
              user_Image.className = "user-chat-profile profile-chat-modify"
              


        const user_Chat = document.createElement('div')
        const user_Node = document.createTextNode(data.message)
              user_Chat.className = (isOwn ? "user-reply " : 'client-reply')

        user_Chat.appendChild(user_Node)
           user_flexing_contain.appendChild(user_Image)
        user_flexing_contain.appendChild(user_Chat)
        chatBoxRef.current.appendChild(user_flexing_contain)
        
        chatBoxRef.current.scrollTo({
        left: 0,
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });

    
    }

      const submit = (data) => {

        reset()
        renderMessage({message: data.message, profile : profileImg},true)
        socket.emit('message',{message: data.message, profile : profileImg},true)

      }


        useEffect(() => {  
            setProfileImg(generateAvatar('Rafcel'))
            socket.connect()
            socket.on('send-message', (data) => {
              renderMessage({message: data.message, profile : data.profile},false)
           })    
           

           

               return () => {
                   socket.off('send-message')
                   socket.disconnect()
               }
      
            },[])




  return (
    <>

    <div className="client-chat-flexing-contain">
     <div className="client-chat-contain">
      <div className="chat-block-contain client-block-chat">
        <div className="user-chat-block-information">
          <div className="user-selected-name">
             <img src={profileImg} alt="" className='user-chat-profile profile-chat-modify'/>
            <span className="user-chat-name user-chat-modify">
              Costumer Service
            </span>
          </div>
          <div className="user-selected-option">
            <SearchIcon className="input-icons" />
          </div>
        </div>
        <div className="user-chat-block-contain  " ref={chatBoxRef}></div>
        <form className="chat-form-submit" onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            name=""
            className="admin-send-chat-input client-chat-input"
            {...register("message", {
                     required : {
                                  value: true
                                },
                onChange : () => setUserChat(true)
            })}
          />
          <button type="submit" className="admin-send-chat-submit">
            <TelegramIcon />
          </button>
        </form>
      </div>
      </div>
        <RenderAlert element={<p>Rafcel</p>}/>
      </div>
    </>
  );
};

export default ClientChat;
