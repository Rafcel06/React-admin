import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,  
  // headers: { 'Content-Type': 'multipart/form-data' },
});



axiosInstance.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem(process.env.REACT_APP_STORAGE_KEY).token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>  {
     Promise.reject(error)
  }
);

  axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => { 
     secureLocalStorage.setItem("ExpiredIn" , "true" )
    if (error.response.status === 401) {
      console.error('Unauthorized access, please log in');
    }
    return error
  }
);

export default axiosInstance;
  