const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../db/database')
const multer = require('multer');
const isAuthenticated = require('../gaurd/authGuard')
const session = require('express-session')
const { decode, encode} = require('../encodeDecode/encodeDecode');



router.use(session({
    secret : 'secret_key_for_auth',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 3600000,
        secure : false
        // httpOnly : true

    }
}))




 const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, '/File'); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp} -- ${file.originalname}`);
    }
});


 const upload = multer({ storage });


router.post('/login', async (req,res) => {


    console.log(req.body)
   
    // const {email, password} = decode(req.body)
   
    // try {

    //     if(!email || !password) {
    //          res.status(200).json({message:'required username and password'})
    //     }



    //     let sql = `SELECT * FROM users WHERE email = ?`
    //     let result = await db.executeQuery(sql,[email])
       
    //     if(!result[0]) {
    //          res.status(401).json({message:'No account associate on this email'})
    //          return
    //     }


    //      bcryptjs.compare(password, result[0].password , (err,success) => {

    //         if(err) {
    //             res.status(401).json({message : 'Password does not match'})

    //         }


    //         let {password, ...user } = result[0]
    //         const token = jwt.sign({email: email},process.env.AUTHENTICATED_SECRET_KEY, {expiresIn:'2hrs'})
    //         res.status(201).json(encode({user,token}))
    //      })

    // }
    // catch (err) {
    //     console.log(err)
    //         res.status(500).json({message:'Internal server error'})
    // }
})





router.post('/register', upload.single('img'),async (req,res, next) => {


     console.log(req.files)

    let { email, password, first_name, last_name, middle_name, phone } = req.body

    try {
    
       let sql =  `SELECT email from users WHERE email = ?`
       let result = await db.executeQuery(sql,[email])
 

       if(result.length > 0) {
           res.status(200).json({message:'Email is not available'})
           return
       }


            const hashed =  await bcryptjs.hash(password, 10)
            let insertSql = `INSERT INTO users (email, password,first_name,last_name, middle_name, phone) VALUES(?, ?, ?, ?, ?, ?)`
            let insertResult =  await db.insertQuery(insertSql,[email, hashed, first_name, last_name, middle_name, phone])


            res.status(200).json({message: 'Account succesfully created', data: insertResult})

    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})


router.get('/users',  async (req, res) => {
    
    try {

        let sql =  `SELECT email, first_name,last_name, middle_name, phone, id  FROM users;`
        let result = await db.executeQuery(sql)
        

        res.status(200).json(encode({data:result}))
    }
    catch(err) {
      res.status(500).json({message:'Internal server error'})
    }
})



module.exports = router








