import React from 'react'
import useModal from '../customHooks/useModal'
import "../css/component.css";



const Dashboard = () => {


  const { RenderModal,  showModalElement, hideModalElement } = useModal()



  return (
     <>
          <div className='tab-headers'>
               <h2>Dashboard</h2>
             </div>
            
    </>
  )
}

export default Dashboard