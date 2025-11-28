import React, { useEffect } from "react";
import "../css/component.css";
import "../css/formStyle.css";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState} from "react";
import { useForm } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../customHooks/useLocalStorage";
import axios from "axios";
import useEncryptDecrypt from "../customHooks/useEncryptDecrypt";
import useBackDrop from "../customHooks/useBackDrop";
import useSnackBar from "../customHooks/useSnackBar";



const Login = () => {

  const { handleSubmit, register ,formState} = useForm()
   const { errors } = formState
  const { getSecureStorage, setSecureStorage, removeSecureStorage } = useLocalStorage()
  const {showAlert, hideAlert , RenderSnackBarSuccess, RenderSnackBarFailed} = useSnackBar()
 
  const [Invalid,setInvalid] = useState()
  const [showPass,setShowPass] = useState(true);
  const {setEncode, setDecode} = useEncryptDecrypt()
  const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()

  
  
   const navigate = useNavigate()

  const setShowPassword = () => {
          setShowPass(true) 
    
  }

    const setHidePassword = () => {
          setShowPass(false)
  }

  useEffect(() => {
    showAlert()
  },[])

  const submit = (data) => {  
    setInvalid(false)
    showBackDrop()
    axios.post(process.env.REACT_APP_URL + 'login',{ parsed :setEncode(data)})
        .then((response) => {
   
             let decodeData =  setDecode(response?.data)
              setSecureStorage(process.env.REACT_APP_STORAGE_KEY, decodeData)
              hideBackDrop()
              navigate('/home', { replace: true })
          })
        .catch((err) => {
          console.log(err)
             setInvalid(err?.response?.data?.message || err?.message)
             hideBackDrop()
          
          })
  }  




  return (
    <div className="login-container">
      <div className="login-form-contain">
        <div className="login-box" id="render-chat">

        </div>
        <div className="login-box">
          <div className="form-container">
            <p className="title">Welcome back</p>
            <form className="form" onSubmit={handleSubmit(submit)}>

              <div className="input-contain">
               
              <input type="email" className="input-text"  placeholder="Email" {...register('email', {
                required : {
                  value : true,
                   message : '*Email is required',
                },
                pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
              })}/>
              </div>
              <p className="form-errors">{errors.email?.message}</p>
              
              <div className="input-contain-icons">
                <input type={showPass ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Password" {...register('password', {
                  required : {
                   value: true,
                  message: '*Password is required'
                  }
                 // pattern : '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$'
                })} />
                  { showPass ?  <VisibilityOffIcon className="input-icons" onClick={setHidePassword}/>  : <RemoveRedEyeIcon className="input-icons" onClick={setShowPassword} />}
                </div>
                <p className="form-errors">{Invalid ? Invalid : errors.password?.message}</p>
              <p className="page-link">
                <Link className="page-link-label" to='/forgot-password'>Forgot Password?</Link>
              </p>
              <button type="submit" className="form-btn" style={btnStyle} disabled={backDropState}>{ backDropState ? <BackDropModal/> : 'Log in'}</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
