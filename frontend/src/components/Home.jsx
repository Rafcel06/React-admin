
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
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SESSION_END } from '../constants/constant';
import useFetch from "../customHooks/useFetch";
import useBackDrop from "../customHooks/useBackDrop";
import useAlert from "../customHooks/useAlert";
import useLocalStorage from "../customHooks/useLocalStorage";
import CookieIcon from '@mui/icons-material/Cookie';
import useEncryptDecrypt from "../customHooks/useEncryptDecrypt";
import tokenExpirationState from "../Interceptor/interceptor"
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";

function Home() {

   const navigationRef = useRef(null)
   const homeContainerRef = useRef(null)
   const { BackDropModal, hideBackDrop, showBackDrop } = useBackDrop()
   const { RenderAlert, showAlertElement, hideAlertElement } = useAlert()
   const { fetchData,error,setFetchState, getData } = useFetch()
   const {setSecureStorage, getSecureStorage, removeSecureStorage, clearSecureStorge}  = useLocalStorage()
   const {setEncode,setDecode} = useEncryptDecrypt()
   const [userAuth,setUserAuth] = useState()
   const navigate = useNavigate()
   const  [navState, setNavState] = useState(false)
  

   const hideShow = () => {
       setNavState((prevState) => !prevState)
       navigationRef.current.classList.toggle('showNav')
   }

   const hideNavigation = () => {
        if(!navState) {
              navigationRef.current.classList.add('showNav')
              setNavState(true)
        }

   }


   const gotoLogin = () => {  
        navigate('/')
        clearSecureStorge()
   }

   const checkSession = () => {
     if(secureLocalStorage.getItem('ExpiredIn') == "true") {
        showAlertElement()
      }
    }

  

  useEffect(() => {
     setUserAuth(getSecureStorage(process.env.REACT_APP_STORAGE_KEY).user)
  },[])

  return (
    <div className='home-container' ref={homeContainerRef} onClick={hideNavigation}>
      <RenderAlert element={
               <>
                 <CookieIcon className='alert-icons'/>
                 <h3 className='alert-title'>{SESSION_END}</h3>
                 <button className='alert-button' onClick={gotoLogin}>Goto login</button>

               </>
                }/>
       <BackDropModal/>
        <div className="home-navigation showNav" ref={navigationRef} onClick={(e) => e.stopPropagation() }>
          <div className='logo-admin-contain'>
                 <img src={user} alt="" className='admin-logo' />
                 <p className='user-name'>{userAuth?.first_name + ' ' +  userAuth?.last_name}</p>
          </div>
           <ul className='navigation-list'>
               <Link to={''} className="navigation-links" onClick={checkSession}><AutoAwesomeMosaicIcon className='navigation-icons'/> Dashboard</Link>
               <Link to={'analytics'} className="navigation-links" onClick={checkSession}><AnalyticsIcon className='navigation-icons'/> Table</Link>
               <Link to={'report'} className="navigation-links" onClick={checkSession}><BarChartIcon className='navigation-icons'/> Report</Link>
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