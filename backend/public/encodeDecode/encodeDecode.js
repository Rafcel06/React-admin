const CryptoJS = require('crypto-js')
require('dotenv').config()

const encode = (data) => { 
     let encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_code221113').toString();
     return encrypt;
}



const decode = (data) => {
     let decrypt = CryptoJS.AES.decrypt(data,'secret_code221113').toString(CryptoJS.enc.Utf8);
     return JSON.parse(decrypt);
}




module.exports = { decode, encode }