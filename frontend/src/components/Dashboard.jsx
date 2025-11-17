import React from 'react'
import useModal from '../customHooks/useModal'
import "../css/component.css";
import PersonIcon from '@mui/icons-material/Person';


const Dashboard = () => {


  const { RenderModal,  showModalElement, hideModalElement } = useModal()



  return (
     <>
          <div className='tab-headers'>
               <h2>Dashboard</h2>
             </div>
           <div className='dashboard-header-contain'>
              <div className='dasboard-block'>
                  <div className='dashboard-mini-block'>
                        <PersonIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>People</p>
                         <p className='dashboard-text'>123</p>
                  </div>
              </div>
           </div>
            
    </>
  )
}

export default Dashboard