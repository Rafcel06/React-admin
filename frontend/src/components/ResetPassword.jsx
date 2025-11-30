import React from 'react'
import "../css/component.css";
import "../css/formStyle.css";
import { useForm } from 'react-hook-form'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBackDrop from '../customHooks/useBackDrop';


const ResetPassword = () => {

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
        <div className="reset-password-container">
      <div className="reset-password-form-contain">
      
        <div className="reset-password-box">
          <div className="form-container">
            <p className="title">Welcome back</p>
            <form className="form" onSubmit={handleSubmit(submit)}>

            <div className="input-contain-icons">
                <input type={showPassCurrent ? 'password' : 'text'} className="input-text input-with-icons" placeholder="Current Password" {...register('currentPassword', {
                  required : {
                   value: true,
                  message: '*Current Password is required'
                  }
                })} />
                  { showPassCurrent ?  <VisibilityOffIcon className="input-icons" onClick={() => setCurrentShowPass(false)}/>  : <RemoveRedEyeIcon className="input-icons" onClick={() => setCurrentShowPass(true)}/>}
                </div>
                  <p className="form-errors">{errors.currentPassword?.message}</p>

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
              <p className="page-link">
                <Link className="page-link-label" to='/'>Login Account?</Link>
              </p>
              <button className="form-btn" style={btnStyle} disabled={backDropState}><BackDropModal/>Reset</button>
            </form>
          </div>
        </div>
          <div className="reset-password-box"></div>
      </div>

    </div>
  )
}

export default ResetPassword