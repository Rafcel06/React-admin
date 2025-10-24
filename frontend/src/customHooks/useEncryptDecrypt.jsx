import React from 'react'
import CryptoJS from 'crypto-js'

const useEncryptDecrypt =  () => {
     
    const setEncode = (data) => {
         let encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_DECODE).toString();
         return encrypt;

    }


    const setDecode =  (data) => {
                let decrypt =  CryptoJS.AES.decrypt(data,process.env.REACT_APP_DECODE).toString(CryptoJS.enc.Utf8);
                return JSON.parse(decrypt);
    }

  return   { setEncode , setDecode }
}

export default useEncryptDecrypt