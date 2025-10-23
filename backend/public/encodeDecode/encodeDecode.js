const CryptoJS = require('crypto-js')


const encode = (data) => {
     let encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.DECODE_SECRET).toString();
      return encrypt;
}


const decode = (data) => {
     let decrypt = CryptoJS.AES.decrypt(data,process.env.DECODE_SECRET ).toString(CryptoJS.enc.Utf8);
       return JSON.parse(decrypt);
}


module.exports = { decode, encode }