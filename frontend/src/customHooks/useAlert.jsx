import React from 'react'
import { useState } from 'react'

const useAlert = () => {
  
  const [ alertState, setAlertState ] = useState(false);



  const hideAlertElement = () => {
    setAlertState(false)
  }

    const showAlertElement = () => {
    setAlertState(false)
  }


  

  const RenderAlert = (message) => {
     return (
        <> { alertState ? <div className='alert-container'>
                 <div className='alert-contain'>{message}</div>
            </div> : null}
            
        </>
     )
  }

  return { RenderAlert, showAlertElement, hideAlertElement}
}

export default useAlert 