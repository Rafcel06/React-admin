import { useEffect,useState } from 'react'
import useLocalStorage from './useLocalStorage'
import useEncryptDecrypt from './useEncryptDecrypt'
import axiosInstance from '../Interceptor/interceptor.js'
import axios from 'axios'


const useFetch = (url) => {
  

   const [fetchData, setData] = useState([])
   const [errorState,setError] = useState()
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
          // const postResponse = await axiosInstance.post(url,{parsed:setEncode(data)})
          const postResponse = await axiosInstance.post(url,data)
          // return setDecode(postResponse)
          return postResponse

        }
    catch(err) {
             setError(err.message)
    }
    }



    const postDataNoAuth = async (url,data) => {

         try {

          const postResponseNoAuth = await axios.post(url,data)
          return postResponseNoAuth

         }
         catch (err) {
            setError(err.message)
         }
    }


    const updateData =  async (url,data) => {
  
        try {
          const updateResponse = await axiosInstance.put(url,data)
          return updateResponse

        }
    catch(err) {
             setError(err.message)
    }
    }


    const deleteData =  async (url) => {

        try {
          const deleteResponse = await axiosInstance.delete(url)
          return deleteResponse

        }
    catch(err) {
           setError(err.message)
    }
    }

    




  return  { fetchData, errorState, fetchState, setFetchState, getData, postData, postDataNoAuth, updateData, deleteData }
}

export default useFetch