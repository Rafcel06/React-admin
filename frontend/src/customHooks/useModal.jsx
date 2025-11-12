import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


const useModal = () => {

   const [showModal,setShowModal] = useState(false)



  const showModalElement = () => {
      setShowModal(true)
  }


  const hideModalElement = () => {
     setShowModal(false)
  }


  useEffect(() => {


    const keyUpModal = (key) => {
        if(key.key === "Escape") {
             hideModalElement()
        }

    }

      window.addEventListener('keyup', keyUpModal)

   return window.removeEventListener('keyup', keyUpModal)

  },[])


  const RenderModal = ({element}) =>  { 
    return ( 
        <>
        { showModal ? 
           <div className='modal-hook-container' onClick={hideModalElement}>
                 <div className='modal-hook-contain' onClick={(e) => e.stopPropagation()}> {element} </div> 
           </div>
        : null }
        </>
  )
}

  return {  RenderModal,  showModalElement, hideModalElement }
}

export default useModal