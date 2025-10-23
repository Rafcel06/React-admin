import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import "../css/component.css";


const ForgotEmail = () => {

      const { handleSubmit, register,formState } = useForm()
      const { errors} = formState
      const submit = (data) => {
        console.log('submit')
      }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-contain">
     
        <div className="forgot-password-box">
          <div className="form-container">
            <p className="title">Forgot password</p>
            <form className="form" onSubmit={handleSubmit(submit)}>
                   <div className="input-contain">
              <input type="email" className="input" placeholder="Email" {...register('email', {
                required : {
                    value : true,
                    message : '*Email is required'
                },
                pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
              })}/>
              </div>
                <p className="form-errors">{errors.email?.message}</p>
 
              <p className="page-link">
                <Link className="page-link-label" to='/'>Login Account?</Link>
              </p>
              <button className="form-btn">Sent</button>
            </form>
          </div>
        </div>
           <div className="forgot-password-box"></div>
      </div>
    </div>
  )
}

export default ForgotEmail