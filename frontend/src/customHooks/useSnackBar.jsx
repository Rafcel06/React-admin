import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/customHooks.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useSnackBar = () => {

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

  
  const RenderSnackBarSuccess = ({message}) => {
    return <>
                    {
        alertState ? 
          <div className='snackbar-container'>
              <div className='snackbar-message'>
                    <TaskAltIcon className='snackbar-icons success'/>  {message}
              </div>
         </div> : null
        }
       </>
  }


  const RenderSnackBarFailed = ({message}) => {
    return <>
                    {
        alertState ? 
          <div className='snackbar-container'>
              <div className='snackbar-message'>
                     <ErrorOutlineIcon className='snackbar-icons failed'/> {message}
              </div>
         </div> : null
        }
        </>
  }


  return  { showAlert, hideAlert, RenderSnackBarSuccess, RenderSnackBarFailed}
}

export default useSnackBar