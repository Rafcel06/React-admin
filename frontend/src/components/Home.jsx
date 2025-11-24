import React, { useEffect } from 'react'
import "../css/component.css";
import "../css/tableStyle.css";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import user from '../images/user-logo.png'
import { Outlet , Link} from "react-router-dom"
import { useRef } from 'react';
import useFetch from '../customHooks/useFetch';
import useBackDrop from '../customHooks/useBackDrop';
import useLocalStorage from '../customHooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

function Home() {



   const navigationRef = useRef(null)
   const navigate = useNavigate()
   const { BackDropModal, hideBackDrop, showBackDrop } = useBackDrop()
   const {fetchData, error,getData, postData,updateData,deleteData} = useFetch(process.env.REACT_APP_URL + '/users')
   const {setSecureStorage, getSecureStorage, removeSecureStorage, clearSecureStorge}  = useLocalStorage()
   const hideShow = () => {
       navigationRef.current.classList.toggle('showNav')
   }

   const gotoLogin = () => {  
            clearSecureStorge()
   }







  return (
    <div className='home-container'>
       <BackDropModal/>
        <div className="home-navigation showNav" ref={navigationRef}>
          <div className='logo-admin-contain'>
                 <img src={user} alt="" className='admin-logo' />
                 <p className='user-name'>Full Name</p>
          </div>
           <ul className='navigation-list'>
               <Link to={''} className="navigation-links"><AutoAwesomeMosaicIcon className='navigation-icons'/> Dashboard</Link>
               <Link to={'analytics'} className="navigation-links"><AnalyticsIcon className='navigation-icons'/> Table</Link>
               <Link to={'report'} className="navigation-links"><BarChartIcon className='navigation-icons'/> Report</Link>
           </ul>
            <ul className='navigation-list-logout'>
               <Link  to={'/'} className="navigation-links" onClick={gotoLogin}><LogoutIcon className='navigation-icons'/> Logout</Link>
           </ul>

  
        </div>
        <div className="home-main-content-contain">
            <div className="home-header-contain">
                <div className="header-list">  
             
                     <AccountCircleIcon className='header-icons'/> 
                     <SettingsIcon className='header-icons'/> 
                     <MenuIcon className='header-icons mobile-menu' onClick={hideShow}/> 
                </div>
            </div>
            <div className="home-main-content">
              <Outlet/>
            </div>
        </div>
      
    </div>
  )
}

export default Home