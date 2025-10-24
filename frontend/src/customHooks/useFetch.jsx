import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'
import useEncryptDecrypt from './useEncryptDecrypt'

const useFetch = (url) => {
  

   const [fetchData, setData] = useState([])
   const [error,setError] = useState()
   const {setSecureStorage,getSecureStorage,removeSecureStorage} = useLocalStorage()
   const { setEncode, setDecode} = useEncryptDecrypt()
   

   const config = {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${getSecureStorage(process.env.REACT_APP_STORAGE_KEY)}`
   }
   

    
   const getData =  async (url) => {
         try {  
              const response = await axios(url,{headers:config})
              const data = await setDecode(response.data)
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
          const postResponse = await axios.post(url,{parsed:setEncode(data)},{headers : config})
          return setDecode(postResponse)

        }
    catch(err) {
             setError(err.message)
    }
    }


         const updateData =  async (url,data) => {

        try {
          const updateResponse = await axios.update(url,{parsed:setEncode(data)}, { headers : config})
          return setDecode(updateResponse)

        }
    catch(err) {
             setError(err.message)
    }
    }


         const deleteData =  async (url,data) => {

        try {
          const deleteResponse = await axios.delete(url,config)
          return setDecode(deleteResponse)

        }
    catch(err) {
           setError(err.message)
    }
    }

    




  return  { fetchData, error, getData, postData, updateData, deleteData }
}

export default useFetch