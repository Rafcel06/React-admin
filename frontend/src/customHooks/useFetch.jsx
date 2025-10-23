import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  

   const [data, setData] = useState([])
   const [error,setError] = useState()
   

   const config = {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer `
   }
   
   const getData =  async (url) => {
         try {  
              const response = await axios(url)
              const data = await response.data
              return data
         }
         catch(err) {
               console.log(err.message)
         }
  }
   
    useEffect(() => {
          
        getData(process.env.REACT_APP_URL + '/users').then((response) => {
            setData(response)
        
        })
        .catch((err) => {
             setError(err.message)
        })

  },[])


     const postData =  async (url,data) => {

        try {
          const postResponse = await axios.post(url,data)
          return postResponse

        }
    catch(err) {
             setError(err.message)
    }
    }


         const updateData =  async (url,data) => {

        try {
          const updateResponse = await axios.update(url,data,config)
          return updateResponse

        }
    catch(err) {
             setError(err.message)
    }
    }


         const deleteData =  async (url,data) => {

        try {
          const deleteResponse = await axios.delete(url,config)
          return deleteResponse

        }
    catch(err) {
           setError(err.message)
    }
    }

    




  return  { data, error, getData, postData, updateData, deleteData }
}

export default useFetch