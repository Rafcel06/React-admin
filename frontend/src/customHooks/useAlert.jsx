import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useAlert = () => {
  
  const [ alertState, setAlertState ] = useState(false);
  const navigate = useNavigate() 


  const hideAlertElement = () => {
    setAlertState(false)
  }

   const showAlertElement = () => {
    setAlertState(true)
  }


  // const closeAlertContain = () => {
  //     setAlertState(false)
  //     navigate('/')
  // }


   

  const RenderAlert = ({element}) => {
     return (
        <> { alertState ? <div className='alert-container' 
              //  onClick={closeAlertContain}
               >
                 <div className='alert-contain' onClick={(e) => e.stopPropagation()}>{element}</div>
            </div> : null}
            
        </>
     )
  }

  return { RenderAlert, showAlertElement, hideAlertElement}
}

export default useAlert 
