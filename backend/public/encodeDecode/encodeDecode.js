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



console.log(decode("U2FsdGVkX19twgHOgDYrfog4gjfM7mIpOfeiZE9BbwxI9PMKFfreioS+rbOSx0J17/spAOv+ckrqR6noHDu+ymDwjjxyoUyCwNt/a14/+UY="))

module.exports = { decode, encode }