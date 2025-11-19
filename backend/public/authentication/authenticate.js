const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../db/database')
const multer = require('multer');
const isAuthenticated = require('../gaurd/authGuard')
const session = require('express-session')
const { decode, encode} = require('../encodeDecode/encodeDecode');
const fs = require('fs')


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
        cb(null, './public/file'); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp} -- ${file.originalname}`);
    }
});


 const upload = multer({ storage });

    
router.post('/login', async (req,res) => {
   
       
    const {email, password} = decode(req.body.parsed)

    try {

        if(!email || !password) {
             res.status(200).json({message:'required username and password'})
        }



        let sql = `SELECT * FROM users WHERE email = ?`
        let result = await db.executeQuery(sql,[email])
       
        if(!result[0]) {
             res.status(401).json({message:'No account associate on this email'})
             return
        }


        bcryptjs.compare(password, result[0].password , (err,success) => {

            if(!success) {
                res.status(401).json({message : 'Password does not match'})
                return
            }


            let {password, ...user } = result[0]
            const token = jwt.sign({email: email},process.env.AUTHENTICATED_SECRET_KEY, {expiresIn:'2hrs'})
            res.status(201).json(encode({user,token}))

         })

     

    }
    catch (err) {
            res.status(500).json({message:'Internal server error'})
    }
})


// authentication CRUD


router.post('/register', upload.single('image'),async (req,res, next) => {


   
    let { email, password, first_name, last_name, middle_name, phone, image } = req.body
           image = `${req.protocol}://${req.get('host')}/` +  req.file.filename 
    
    try { 
    
       let sql =  `SELECT email from users WHERE email = ?`
       let result = await db.executeQuery(sql,[email])
 

       if(result.length > 0) {
           res.status(200).json({message:'Email is not available'})
           return
       }


            const hashed =  await bcryptjs.hash(password, 10)
            let insertSql = `INSERT INTO users (email, password, first_name,last_name, middle_name, phone,image) VALUES(?, ?, ?, ?, ?, ?, ?)`
            let insertResult =  await db.insertQuery(insertSql,[email, hashed, first_name, last_name, middle_name, phone, image])


            res.status(200).json({message: 'Account succesfully created', data: insertResult})

    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})





router.put('/update-profile/:id',  upload.single('image'), async (req,res) => {
    

    let id = req.params.id
    let {email, password, first_name, last_name, middle_name, phone} = req.body


    let sql = `UPDATE users SET`;
    let values = []


    try {

         let sqlCheck = `SELECT image FROM users WHERE id = ?`
         let checkImg = await db.executeQuery(sqlCheck,[id])
         let splitImg = await checkImg[0].image.split('/')


    if(fs.existsSync(`./public/file/${splitImg[splitImg.length - 1]}`)) {

          fs.unlink(`./public/file/${splitImg[splitImg.length - 1]}`, (err) => {
              if(err) {
                  res.status(500).json({message:err})
              }
           })
       }



        if(email) {
              sql += ` email = ?,`
              values.push(email)
        }

        if(password) {

              let hashed =  await bcryptjs.hash(password,10)
              sql += ` password = ?,`
              values.push(hashed)
        }

        if(first_name) {
              sql += ` first_name = ?,`
              values.push(first_name)
        }

        if(last_name) {
              sql += ` last_name = ?,`
              values.push(last_name)
        }
        

        if(middle_name) {
              sql += ` middle_name = ?,`
              values.push(middle_name)
        }

        if(req.file.filename) {
             sql += ` image = ?`
             values.push(`${req.protocol}://${req.host}/${req.file.filename}`)
        }

        if(phone) {
              sql += ` phone = ?`
              values.push(phone)
        }


        if(id) {
            sql += ` WHERE id = ?`
            sql.slice(0,-1)
            values.push(id)
        }

     
        let result =  await db.executeQuery(sql,values)

        if(result.affectedRows > 0) {
            res.status(201).json({message:result})
        }

        else  {
            res.status(500).json({message: 'No row affected'})
        }

    

    }
    catch(err) {

        
              console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})


router.get('/users', isAuthenticated, async (req, res) => {
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone  FROM users;`
        let result = await db.executeQuery(sql)
        

        res.status(200).json(encode({data:result}))
        
    }
    catch(err) {
      res.status(500).json({message:'Internal server error'})
    }
})



module.exports = router








