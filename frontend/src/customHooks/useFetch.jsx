import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'
import useEncryptDecrypt from './useEncryptDecrypt'
import axiosInstance from '../Interceptor/interceptor.js'

const useFetch = (url) => {
  

   const [fetchData, setData] = useState([])
   const [error,setError] = useState()
   const [fetchState,setFetchState] = useState(false)
   const {setSecureStorage,getSecureStorage, removeSecureStorage} = useLocalStorage()
   const { setEncode, setDecode} = useEncryptDecrypt()
   
    
   const getData = async (url) => {
         try {  
              const  response = await axiosInstance.get(url)
              return response
         }
         catch(err) {
               setError(err)
         }  
  }
   
    useEffect(() => {
          
        getData(url).then((response) => {
          setData(response)
        })
        .catch((err) => {
          setError(err)
        })

  },[])


    const postData =  async (url,data) => {
    
        try {
          const postResponse = await axiosInstance.post(url,{parsed:setEncode(data)})
          return setDecode(postResponse)

        }
    catch(err) {
             setError(err.message)
    }
    }


    const updateData =  async (url,data) => {

        try {
          const updateResponse = await axiosInstance.put(url,{parsed:setEncode(data)})
          return setDecode(updateResponse)

        }
    catch(err) {
             setError(err.message)
    }
    }


    const deleteData =  async (url,data) => {

        try {
          const deleteResponse = await axiosInstance.delete(url)
          return setDecode(deleteResponse)

        }
    catch(err) {
           setError(err.message)
    }
    }

    




  return  { fetchData, error, fetchState, setFetchState, getData, postData, updateData, deleteData }
}

export default useFetch