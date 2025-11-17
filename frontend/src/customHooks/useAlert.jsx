import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/customHooks.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useAlert = () => {

  const [alertState,setShowAlert] = useState(false)
  
  const  showAlert = () => {
     setShowAlert(true) 
  }

  const hideAlert  = () => {
     setShowAlert(false)
  }


  useEffect(() => {
    setTimeout(() => {
       setShowAlert(false)
    },3000) 
  }, [alertState])

  
  const RenderAlertSuccess = ({message}) => {
    return <>
                    {
        alertState ? 
          <div className='alert-container'>
              <div className='alert-message'>
                    <TaskAltIcon className='alert-icons success'/>  {message}
              </div>
         </div> : null
        }
       </>
  }


  const RenderAlertFailed = ({message}) => {
    return <>
                    {
        alertState ? 
          <div className='alert-container'>
              <div className='alert-message'>
                     <ErrorOutlineIcon className='alert-icons failed'/> {message}
              </div>
         </div> : null
        }
        </>
  }


  return  { showAlert, hideAlert, RenderAlertSuccess, RenderAlertFailed}
}

export default useAlert