import React, { useEffect } from 'react'
import '../css/messageStyle.css'
import ErrorIcon from '@mui/icons-material/Error';
import { DELETE_DATA } from '../constants/constant';
import useBackDrop from '../customHooks/useBackDrop';



const DeleteData = ({method}) => {
  
  const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()


  const cancelRequest = () => {
    method.cancel()
  }


  const confirmRequest = () => {
    showBackDrop()
    method.confirm()
  }



  return (
    <div className='message-alert-contain'>
           <ErrorIcon className='message-icons'/>
           <h3 className='message-title'>{DELETE_DATA}</h3>
           <div className='message-btn-contain'>
                <button className='message-btn delete-confirm' onClick={confirmRequest} disabled={backDropState}>{ backDropState ? <BackDropModal/> : 'Submit'}</button>
                <button className='message-btn' onClick={cancelRequest}>Cancel</button>
           </div>
    </div>
  )
}

export default DeleteData