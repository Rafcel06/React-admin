import React from "react";
import { useState } from "react";
import "../../css/chatCustomerStyle.css";
import "../../css/formStyle.css";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import TelegramIcon from '@mui/icons-material/Telegram';
import SearchIcon from "@mui/icons-material/Search";
import profile from "../../images/user-logo.png";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import socket from "../SocketIO/SocktetIO";
import { useEffect } from "react";


const ClientChat = () => {

  const [userChat,setUserChat] = useState(false)
  const [sendChatState,setSendChatState] = useState(false)
  const { handleSubmit, reset, register ,formState} = useForm();
  const chatBoxRef = useRef(null)


   const renderMessage = (data,isOwn) => {

        const user_Chat = document.createElement('div')
        const user_Node = document.createTextNode(data)
              user_Chat.className = (isOwn ? "user-reply " : 'client-reply')

        user_Chat.appendChild(user_Node)
        chatBoxRef.current.appendChild(user_Chat)
        
   

        chatBoxRef.current.scrollTo({
        left: 0,
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });

      


    }


      const submit = (data) => {

        reset()
        renderMessage(data.message,true)
        socket.emit('message',data.message)

    
       
   
      }


        useEffect(() => {  
    
            socket.connect()
            socket.on('send-message', (data) => {
              renderMessage(data.message,false)
           
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
            <img    
              src={profile}
              alt=""
              className="user-chat-profile profile-chat-modify"
            />
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
      </div>
    </>
  );
};

export default ClientChat;
