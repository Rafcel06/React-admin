import React from "react";
import { useState } from "react";
import "../../css/chatCustomerStyle.css";
import "../../css/customHooks.css";
import "../../css/formStyle.css";
import "../../css/component.css";
import TelegramIcon from '@mui/icons-material/Telegram';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import profile from "../../images/user-logo.png";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import socket from "../SocketIO/SocktetIO";
import useAlert from "../../customHooks/useAlert";
import { useEffect } from "react";
import useGenerateAvatar from "../../customHooks/useGenerateAvatar";
import useBackDrop from "../../customHooks/useBackDrop";
import useLocalStorage from "../../customHooks/useLocalStorage";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useFetch from "../../customHooks/useFetch";

import { v4 } from "uuid" 

const ClientChat = () => {

  const [ userChat,setUserChat] = useState()
  const { generateAvatar} = useGenerateAvatar()
  const { setSecureStorage, getSecureStorage, removeSecureStorage, clearSecureStorge } = useLocalStorage()
  const { fetchState, setFetchState, getData, postData, updateData, deleteData} = useFetch()
  const { BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
  const { RenderAlert, showAlertElement, hideAlertElement } = useAlert()
  const { handleSubmit, reset, register ,formState} = useForm();
  const {errors} = formState
  const [showPassword,setPassword] = useState(true);
  const [showPassConfirm,setCurrentConfirm] = useState(true);
  const [profileImg,setProfileImg] = useState()
  const chatBoxRef = useRef(null)
  const [clientState,setClientState] = useState(false)
  const clientInputRef = (null)
  const [clientInputValue,setClientInputValue] = useState()


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

        // renderMessage({message: data.message, profile : profileImg},true)
        // socket.emit('message',{message: data.message, profile : profileImg},true)
                reset()
                showBackDrop()
                postData('/client/register',data)
                .then((response) => {
                    hideBackDrop()
                    hideAlertElement()
                    setSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY,response.data)
                })
                .catch((err) => {
                  console.log(err)
                   hideBackDrop()
                })
        

      }


      const handleSendChat = () => {

        // renderMessage({message: clientChatValue, profile : profileImg},true)
        // socket.emit('message',{message: clientChatValue, profile : profileImg},true)
      }


      const handleSetClientName = () => {

   
           
           let userChat = v4()
           let userProfile = generateAvatar('')
           setProfileImg(userProfile)
           setSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY,{id: userChat, profile: userProfile,name:''})
           socket.emit('create-room', {id: userChat,profile:userProfile,name: ''})
           showBackDrop()  
           setTimeout(() => {
              hideBackDrop()
              hideAlertElement()
           },500)

      }


        useEffect(() => {  

           
            socket.connect()

            if(!getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)) {
                showAlertElement()
            }

            if(getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)) {
              
                const { id, profile, name } = getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)
                       setProfileImg(profile)
                const existingData = {
                  id : id,
                  profile : profile,
                  name : name
                }
     
                socket.emit('reconnect', existingData)
            }


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
             <img src={profile} alt="" className='user-chat-profile profile-chat-modify'/>
            <span className="user-chat-name user-chat-modify">
              Costumer Service
            </span>
          </div>
          <div className="user-selected-option">
            <SearchIcon className="input-icons" />
          </div>
        </div>
        <div className="user-chat-block-contain  " ref={chatBoxRef}></div>
        <form className="chat-form-submit" onSubmit={handleSendChat}>
          <input
            type="text"
            name=""
            className="admin-send-chat-input client-chat-input"
            value={clientInputValue}
            onChange={(e) => setClientInputValue(e.target.value)}
          />
          <button type="submit" className="admin-send-chat-submit">
            <TelegramIcon />
          </button>
        </form>
      </div>
      </div>
        <RenderAlert element={
          <>
            {/* <AccountCircleIcon className='client-chat-alert-icons'/>
                 <h3 className='alert-title'>User name</h3>
                   <div className="input-contain-icons">
                      <input type="text" className="input-text input-with-icons" placeholder="Enter your name" ref={userChatInput} />
                   </div>
                 <button className='alert-button-chat' style={btnStyle} disabled={backDropState} onClick={handleSetClientName} >{ backDropState ? <BackDropModal/> : 'Set'}</button> */}
          <div className="form-container" >
            <p className="title">{clientState ? "Create Account" : "Logn Account"}</p>
                 <form className="form" onSubmit={handleSubmit(submit)}>

            <div className="input-contain">
                 <input type="email" className="input-text"  placeholder="Email" {...register('email', {
                   required : {
                   value : true,
                   message : '*Email is required',
                },
                pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
              })}
              />
                </div>
                <p className="form-errors">{errors.email?.message}</p>

                     <div className="input-contain-icons">
                <input type={showPassword ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Password" {...register('password', {
                  required : {
                   value: true,
                  message: '*Password is required'
                  }
                })} />
                  { showPassword ?  <VisibilityOffIcon className="input-icons" onClick={() => setPassword(false)}/>  : <RemoveRedEyeIcon className="input-icons"  onClick={() => setPassword(true)} />}
                </div>
                <p className="form-errors">{errors.password?.message}</p>
              {
                clientState ? (
                      <div className="input-contain-icons">
                <input type={showPassConfirm ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Confirm Password" {...register('confirmPassword', {
                  required : {
                   value: clientState ? true : false,
                  message: '*Confirm Password is required'
                  }
                })} />
                  { showPassConfirm ?  <VisibilityOffIcon className="input-icons"  onClick={() => setCurrentConfirm(false)}/>  : <RemoveRedEyeIcon className="input-icons"  onClick={() => setCurrentConfirm(true)} />}
                </div>
                ) : null
              }
                <p className="form-errors">{errors.confirmPassword?.message}</p>
                <p class="page-link"><span class="page-link-label" data-discover="true" onClick={() => setClientState((prevState) => !prevState)}>{clientState ? "Login account" : "Create account"}</span></p>
              <button className="form-btn" style={btnStyle} disabled={backDropState}><BackDropModal/>{clientState ? "Create account" : "Login account"}</button>
            </form>
            </div>
               </>}/>
      </div>
    </>
  );
};

export default ClientChat;
