import React from 'react'
import io from "socket.io-client"
import '../../css/chatCustomerStyle.css'
import { useState } from "react"
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

const Chat = () => {

  const socket = io(process.env.REACT_APP_BACKEND_URL)
  const [chatState,setChatState] = useState(false)

  return (
    <>

    {
      chatState ?  
         <div className='chat-message-container' onClick={() => setChatState(false)}>
              <div className='chat-message-contain' onClick={(e) => e.stopPropagation()}></div>
          </div> : <div className='chat-logo-contain' onClick={() => setChatState(true)}>
           <QuestionAnswerRoundedIcon className='chat-icons' />
      </div> 
    }
   
    
    </>
  )
}

export default Chat