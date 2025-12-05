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
  const [isOwnMessage,setIsOwnMessage] = useState()
  const [chatStack,setChatStack] = useState()
  const [sendChatState,setSendChatState] = useState(false)
  const { handleSubmit, reset, register ,formState} = useForm();
    const [socketId,setSocketId] = useState(null)
  const chatBoxRef = useRef(null)

   const renderMessage = (data) => {
    setUserChat(true)

        const user_Chat = document.createElement('div')
        const user_Node = document.createTextNode(data)
              user_Chat.className = (userChat ? "user-reply " : 'client-reply')

        user_Chat.appendChild(user_Node)
        chatBoxRef.current.appendChild(user_Chat)
        
        socket.emit('message',data)
        setIsOwnMessage(true)

    }


      const submit = (data) => {

        reset()
        renderMessage(data.message)
        setUserChat(false)
        setSendChatState((prevState) =>  !prevState) 


      }

        useEffect(() => {

            socket.connect()
            socket.on('send-message', (data) => {
            setSocketId(data.socketId)
            renderMessage(data.message)
        })

    
      
      
               return () => {
                   socket.off('send-message')
                   socket.disconnect()
               }
      
            },[sendChatState])



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
