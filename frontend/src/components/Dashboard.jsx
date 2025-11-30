import "../css/component.css";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useFetch from "../customHooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const Dashboard = () => {

const { fetchState, setFetchState, getData, postData, updateData, deleteData} = useFetch()
const [users,setUsers] = useState();
const [month,setMonth] = useState();
const [time,setTime] = useState();

const date = new Date()

 useEffect(() => {
     setMonth(moment(date).format('MMMM Do YYYY')) 
     setTime(moment().format('LT'))
 },[date.getDay(), date.getHours()]) 


 useEffect(() => {
     getData('users')
     .then((response) => {
        setUsers(response)
     })
     .catch((error) => console.log(error))
 },[fetchState])

  return (
     <>
          <div className='tab-headers'>
               <h2>Dashboard</h2>
             </div>
           <div className='dashboard-header-contain'>
              <div className='dasboard-block' >
                  <div className='dashboard-mini-block'>
                        <PersonIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>People</p>
                         <p className='dashboard-text'>{users?.data?.data?.length}
                         </p>
                  </div>
              </div>

              <div className='dasboard-block'>
                  <div className='dashboard-mini-block'>
                        <PersonIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>People</p>
                         <p className='dashboard-text'>123</p>
                  </div>
              </div>

              <div className='dasboard-block'>
                  <div className='dashboard-mini-block'>
                        <CalendarMonthIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>Month</p>
                         <p className='dashboard-text'>{month}</p>
                  </div>
              </div>


              <div className='dasboard-block'>
                  <div className='dashboard-mini-block'>
                        <AccessTimeIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>Time</p>
                         <p className='dashboard-text'>{time}</p>
                  </div>
              </div>
           </div>
            
    </>
  )
}

export default Dashboard