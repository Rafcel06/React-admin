import React from 'react'
import io from "socket.io-client"
import '../../css/chatCustomerStyle.css'
import "../../css/formStyle.css";
import "../../css/component.css";
import { useForm } from 'react-hook-form'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import useBackDrop from '../../customHooks/useBackDrop';

const ClientRegisterProfile = () => {

      const {handleSubmit, register, formState} =  useForm();
      const {errors} = formState

      const [showPassCurrent,setCurrentShowPass] = useState(true);
      const [showPassword,setPassword] = useState(true);
      const [showPassConfirm,setCurrentConfirm] = useState(true);
      const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
    
      const submit = (data) => {
        showBackDrop()
        console.log(data)
      }
    



  return (
    <>
      <div className="create-client-box">
          <div className="form-container">
            <p className="title">Create Account</p>
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
                <input type={showPassword ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Password" {...register('password', {
                  required : {
                   value: true,
                  message: '*Password is required'
                  }
                })} />
                  { showPassword ?  <VisibilityOffIcon className="input-icons" onClick={() => setPassword(false)}/>  : <RemoveRedEyeIcon className="input-icons"  onClick={() => setPassword(true)} />}
                </div>
                <p className="form-errors">{errors.password?.message}</p>
              <div className="input-contain-icons">
                <input type={showPassConfirm ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Confirm Password" {...register('confirmPassword', {
                  required : {
                   value: true,
                  message: '*Confirm Password is required'
                  }
                })} />
                  { showPassConfirm ?  <VisibilityOffIcon className="input-icons"  onClick={() => setCurrentConfirm(false)}/>  : <RemoveRedEyeIcon className="input-icons"  onClick={() => setCurrentConfirm(true)} />}
                </div>
                <p className="form-errors">{errors.confirmPassword?.message}</p>
              <button className="form-btn" style={btnStyle} disabled={backDropState}><BackDropModal/>Create user</button>
            </form>
          </div>
          </div>
    </>
  )
}

export default ClientRegisterProfile