import React from 'react'
import '../css/messageStyle.css'
import ErrorIcon from '@mui/icons-material/Error';
import { DELETE_DATA } from '../constants/constant';



const DeleteData = ({method}) => {


  //  const {hideModalElement} = method

  const cancelRequest = () => {
    method()
  }

  return (
    <div className='message-alert-contain'>
           <ErrorIcon className='message-icons'/>
           <h3 className='message-title'>{DELETE_DATA}</h3>
           <div className='message-btn-contain'>
                <button className='message-btn delete-confirm'>Confirm</button>
                <button className='message-btn' onClick={cancelRequest}>Cancel</button>
           </div>
    </div>
  )
}

export default DeleteData