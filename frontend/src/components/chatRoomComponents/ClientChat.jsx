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
import useEncryptDecrypt from "../../customHooks/useEncryptDecrypt";
import axios from "axios";
import moment from 'moment';
import { v4 } from "uuid" 

const ClientChat = () => {

  const [ userChat,setUserChat] = useState()
  const { generateAvatar} = useGenerateAvatar()
  const { setSecureStorage, getSecureStorage, removeSecureStorage, clearSecureStorge } = useLocalStorage()
 
  const { BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
   const {setEncode, setDecode} = useEncryptDecrypt()
  const { RenderAlert, showAlertElement, hideAlertElement } = useAlert()
  const { handleSubmit, reset, register ,formState} = useForm();
  const {errors} = formState
  const [showPassword,setPassword] = useState(true);
  const [showPassConfirm,setCurrentConfirm] = useState(true);
  const [profileImg,setProfileImg] = useState()
  const chatBoxRef = useRef(null)
  const [clientState,setClientState] = useState(true)
  const clientInputRef = useRef(null)
  const [noAccount,setNoAccount] = useState("")
  const [clientInputValue,setClientInputValue] = useState()
  const [clientAuthenticationState,setClientAuthenticationState] = useState({
    register : true,
    login : false
  })
  
  const [serverMessage,setServerMessage] = useState("")
  const [emailExist,setEmailExist] = useState(false)
  const [matchPasswordState,setMatchPasswordState] = useState(false)
  const [adminAccount, setAdminAccount] = useState(false)
  const [isLogged,setIsLogged] = useState(false)



  //   const handleHistoryChat  = (data) => {
  //   console.log(data)
  //       data.forEach((each) => {
  //          renderMessage(each,each.isAdmin === 0 ? true : false)
  //       })
  // }

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


      const canvaImage = (base64Image,profileName) => {
         const [meta, data] = base64Image.split(',');
         const mime = meta.match(/:(.*?);/)[1];
         const binary = atob(data);
         const len = binary.length;
         const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
           bytes[i] = binary.charCodeAt(i);
        }

        return new File([bytes],profileName + ".png", { type: 'image/png' });
      }

   

      const submit = async (data) => { 


         try {

   
               if(data.confirmPassword !== data.password && setClientAuthenticationState.register === true) {
                  setMatchPasswordState(true)
                  return
                  
               }

               if(data.confirmPassword === data.password && setClientAuthenticationState.register === true) {
                  setMatchPasswordState(false)
               }

                    showBackDrop()
             
   
                if(clientAuthenticationState.login === true && clientAuthenticationState.register === false) {
      
                axios.post(process.env.REACT_APP_URL + 'login', { parsed :setEncode(data)})

                .then((response) => {
                  
            
                    const { user } = setDecode(response.data)
              
                    if(user.isAdmin === 1) {
                        hideBackDrop()  
                        setAdminAccount(true)
                        return
                    }
                    
                    socket.emit('update-uuid', {uuid : user.user_uuid, id : user.id})
                    localStorage.setItem('socketUUID', user.user_uuid)
                    hideBackDrop()
                    hideAlertElement()
                    setSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY,user)
                    setProfileImg(user.image)
                    window.location.reload()  
                  
                })
                .catch((err) => {
                    setNoAccount(err.response.data.message)
                   hideBackDrop()
                })
                  return 
                }

                if(canvaImage(profile,data.first_name)) {
                  
                        const profile = await generateAvatar(data.first_name)
           

                if(clientAuthenticationState.login === false && clientAuthenticationState.register === true) {
                 const clientReg =  {first_name: data.first_name, image:canvaImage(profile,data.first_name), email: data.email, password: data.password, isAdmin: 0, user_uuid: localStorage.getItem('socketUUID')}

                    
      
                 const form = new FormData()

                       form.append('first_name', clientReg.first_name)
                       form.append('email', clientReg.email)
                       form.append('image', clientReg.image)  
                       form.append('password', clientReg.password)
                       form.append('isAdmin', clientReg.isAdmin)
                       form.append('user_uuid', clientReg.user_uuid)
    

                showBackDrop()
        
                axios.post(process.env.REACT_APP_URL + 'admin/register',form)
                .then((response) => {
                 
                   if(!response) {
                      setEmailExist(true)
                      hideBackDrop()
                      return
                   }
                    socket.emit('create-room-client','created room')
 
                    hideAlertElement()
                    hideBackDrop()
                    setSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY,response.data.data)
                    setProfileImg(getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY).image)
                             window.location.reload()  
                })
                .catch((err) => {
                  setEmailExist(true)
                  setServerMessage(err.response.data.message)
           
                  hideBackDrop()
                })
                  return 
                }
              }
                }


                catch(err) {
                  console.log(err)
                }
              
        
      }




      const handleSendChat = (e) => {
        e.preventDefault()
        if(!clientInputRef.current.value) {
            return
        }
        
  
        const user =  getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)
        const date = new Date()
         renderMessage({message: clientInputRef.current.value, profile : user.image},true)
        socket.emit('message',{message: clientInputRef.current.value, profile : user.image, image : null,client: localStorage.getItem('socketUUID'), user_id: user.id, dt_message :moment(date, 'YYYY-MM-DD HH:mm:ss'),isAdmin : 0, room: user.user_uuid, profile: user.image},true)
        clientInputRef.current.value = ''
      }

      const handleLoginRegisterState = () => {

        setAdminAccount(false)
        reset()
        setClientState((prevState) => !prevState)

        if(!clientState) {
            setClientAuthenticationState({login: false, register: true})
            return
        }
            setClientAuthenticationState({login: true, register: false})
      }

    

        useEffect(() => {   
      
            socket.connect()
            socket.emit('room','From client')
            if(!getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)) {
                showAlertElement()
            }

            if(getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)) {
                const user = getSecureStorage(process.env.REACT_APP_CLIENT_IDENTIFICATION_KEY)
                setProfileImg(user.image)
                }

            socket.on('send-message', (data) => {
                 renderMessage({message: data.message, profile : data.profile},false)
            })
          

               return () => {
                   socket.off('send-message')
                   socket.disconnect()
               }

      
            },[isLogged])



                useEffect(() => {
               socket.connect()
               socket.emit('history-chat',{room : localStorage.getItem('socketUUID')})
               socket.on('get-chat-history', (data) => {
                   data.forEach((each) => {
                  renderMessage(each,each.isAdmin === 0 ? true : false)
        })
          })

 

              return () => {
                   socket.off('get-chat-history')
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
            <SearchIcon className="input-icons"/>
          </div>
        </div>
        <div className="user-chat-block-contain  " ref={chatBoxRef}></div>
        <form className="chat-form-submit" onSubmit={(e) =>handleSendChat(e)}>
          <input
            type="text"
            name=""
            className="admin-send-chat-input client-chat-input"
            ref={clientInputRef}
            // value={clientInputValue}
            // onChange={(e) => setClientInputValue(e.target.value)}
          />
          <button type="submit" className="admin-send-chat-submit" >
            <TelegramIcon />
          </button>
        </form>
      </div>
      </div>
        <RenderAlert element={
          <>

          <div className="form-container" >
            <p className="title">{clientState ? "Create Account" : "Login Account"}</p>
                 <form className="form" onSubmit={handleSubmit(submit)}>
          
                  {
                   clientState ? (
                  <div className="input-contain-icons">
                  <input type="text" className="input-text input-with-icons" placeholder="Name" {...register('first_name', {
                  required : {
                   value: clientState ? true : false,
                    message: '*Name is required'
                  }
                })} />
                </div>
                ) : null
                  } 
            <p className="form-errors">{errors.name?.message}</p>
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
                <p className="form-errors">{errors.password?.message} 
                  {adminAccount ? "Client account not exist" : null}

                </p>
                
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
                <p className="form-errors">{matchPasswordState ? "*Password does not match" : errors.confirmPassword?.message}
                  {emailExist ? serverMessage : null}
                  {noAccount ? noAccount : null}
                </p>
                <p className="page-link"><span className="page-link-label" data-discover="true" onClick={handleLoginRegisterState}>{clientState ? "Create account" : "Login account" }</span></p>
              <button className="form-btn" style={btnStyle} disabled={backDropState}>{backDropState ? <BackDropModal/> : clientState ? "Create account" : "Login account"}</button>
            </form>
            </div>
               </>}/>
      </div>
    </>
  );
};

export default ClientChat;
