import "../css/component.css";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useFetch from "../customHooks/useFetch";
import ViewDayIcon from '@mui/icons-material/ViewDay';
import { useEffect } from "react";
import { useState } from "react";
import Charts from "./chartComponents/Charts";
import moment from "moment";

const Dashboard = () => {

const { fetchState, setFetchState, getData, postData, updateData, deleteData} = useFetch()
const [users,setUsers] = useState();
const [month,setMonth] = useState();
const [day,setDay] = useState();
const [time,setTime] = useState();

const date = new Date()

 useEffect(() => {
     setMonth(moment(date).format('LL')) 
     setDay(moment(date).format('dddd'))
     setTime(moment().format('LT'))
 },[date.getDay(), date.getHours()]) 


 const LineData  = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June','July','Augost','Septemper','October','Novermber','December'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40,50,20,10,3,17,31],
    fill: false,
    backgroundColor: [
      'rgb(98 148 223 / 80%)'

    ],
    borderColor: [
      'rgb(98 148 223 / 100%)'

    ],
        borderWidth: 2,

  }]
}

const dougData = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

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
                        <ViewDayIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>Day</p>
                         <p className='dashboard-text'>{day}</p>
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

              <div className='dasboard-block'>
                  <div className='dashboard-mini-block'>
                        <CalendarMonthIcon className='dashboard-icons'/>
                  </div>
                  <div className='dashboard-mini-block'>
                         <p className='dashboard-text upper-text'>Month</p>
                         <p className='dashboard-text'>{month}</p>
                  </div>
              </div>

           </div>
           <div className="dashboard-chart-container">
                 <div className="dashboard-chart">
                      <Charts options={{
                           type: 'line',
                           data : LineData,
                 
                           options: {
    animations: {
      tension: {
        duration: 3000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100
      }
    },
    
  },

                          }}
                       width={990}
                        height={555}
                          />
                 </div>
                 <div className="dashboard-chart">
                     <Charts 
                       options={{
                           type: 'doughnut',
                           data : dougData,
                           
                           
                     }}
                        width={300}
                        height={300}
                     />
                 </div>
           </div>
            
    </>
  )
}

export default Dashboard