import React from 'react'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import useModal from '../customHooks/useModal';
import { useForm } from 'react-hook-form';
import useBackDrop from '../customHooks/useBackDrop';
import "../css/formStyle.css";
import { useState } from 'react';

const Analytics = () => {

   const  {RenderModal, showModalElement, hideModalElement} = useModal()
   const { handleSubmit, reset,register ,formState} = useForm()
   const { errors } = formState;
   const [fileState, setFileState] = useState(false)
     const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
    const addUser = () => {
       showModalElement()
    }


    const submit = (data) => {
      showBackDrop()
      console.log(data)
    }


    const renderImageFile = (e) => {
          let file = e.target.files[0]
          setFileState(file.name)
          let reader = new FileReader(file)
          reader.onload = function(e) {
      
          }

          reader.readAsDataURL(file)
  }


  const handleCancelSubmit = () => {
      hideModalElement()
      reset()
      setFileState(false)
  }


  return (
    <>
    <div className='tab-headers'>
               <h2>Table</h2>
               <button className='table-headers-action' onClick={addUser}>Add new</button>
             </div>
             <div className='table-contain'>
              <table className='table-container'>
                <thead>
                <tr className='table-header'>
                    <th>Title 1</th>
                    <th>Title 2</th>
                    <th>Title 3</th>
                    <th>Title 4</th>
                    <th>Title 5</th>
                    <th className='table-action'>Action</th>
                </tr>
                </thead>
                <tbody>
    
                <tr>
                    <td>content 1</td>
                    <td>content 2</td>
                    <td>content 3</td>
                    <td>content 4</td>
                    <td>content 5</td>
                    <td className="table-action">
                        <button type="button"className="action-btn" ><EditSquareIcon/></button>
                        <button type="button"className="action-btn" ><DeleteIcon/></button>
                    </td>
                </tr>
    
           
                </tbody>
    
             </table>
                <RenderModal element={
                  <>

                    <h2 className='form-title'>Add user</h2>
               
              <form className="form" onSubmit={handleSubmit(submit)}>

                  <div className="input-contain input-contain-margin-bottom">
                      <label htmlFor="profile" className='input-label'>Profile</label>
                     <label className="custum-file-upload" htmlFor="file">
                       <div className="icon"> 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                       </div>
                       <div className="text">
                      <span>{ fileState ? fileState : 'Click to upload image'}</span>
                      </div>
                      <input type="file" id="file"  {...register('profile', {
                         onChange: (e) => renderImageFile(e),
                      })
                      }/>
                    </label>
                    
                </div>
         
                  <div className="input-flex-contain">
                      
                       <div className="input-contain">
                         <label htmlFor="first_name" className='input-label'>First Name</label>
                         <input type="text" className="input-text" placeholder="First name" {...register('first_name', {
                            required : {
                            value : true,
                            message : '*First name is required',
                            },
                          })}/>
                                 <p className="form-errors">{errors.first_name?.message}</p>
                      </div>

                      <div className="input-contain">
                        <label htmlFor="last_name" className='input-label'>Last Name</label>
                        <input type="text" className="input-text" placeholder="Last name" {...register('last_name', {
                           required : {
                           value : true,
                           message : '*Last name is required',
                           },
                         })}/>
                                <p className="form-errors">{errors.last_name?.message}</p>
                     </div>

                </div>

 

                 <div className="input-contain">
                  <label htmlFor="email" className='input-label'>Email</label>
                   <input type="email" className="input-text" placeholder="Email" {...register('email', {
                      required : {
                      value : true,
                      message : '*Email is required',
                     },
                     pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
                     })}/>
                            <p className="form-errors">{errors.email?.message}</p>
                </div>
            
                 <div className="input-contain">
                  <label htmlFor="password" className='input-label'>Password</label>
                   <input type="password" className="input-text" placeholder="Password" {...register('password', {
                      required : {
                      value : true,
                      message : '*Password is required',
                     },
                     })}/>
                     
              <p className="form-errors">{errors.password?.message}</p>
                </div>


               <div className='form-btn-contain'>
                  <button type="submit" className="form-btn" style={btnStyle} disabled={backDropState}><BackDropModal/>Submit</button>
                  <button type="button" className="form-btn" onClick={() => handleCancelSubmit()}>Cancel</button>
               </div>
             
            </form>
                    </>
                    } />
             </div>
    </>
  )
}

export default Analytics