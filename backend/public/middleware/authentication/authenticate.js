const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../../db/database')
const multer = require('multer');
const isAuthenticated = require('../../gaurd/authGuard')
const session = require('express-session')
const { decode, encode} = require('../../encodeDecode/encodeDecode');
const fs = require('fs')



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


         
            const token = jwt.sign({email: email},process.env.AUTHENTICATED_SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRATION})
            let decodedToken = jwt.decode(token)
            const expirationTimeInSeconds = decodedToken.exp;
            const currentTimeInSeconds = Date.now() / 1000;
            const tokenExpiration = expirationTimeInSeconds - currentTimeInSeconds;
            
            res.status(201).json(encode({user,token,tokenExpiration}))

         })

     

    }
    catch (err) {
            res.status(500).json({message:'Internal server error'})
    }
})


// authentication CRUD


router.post('/admin/register',  upload.single('image'),async (req,res, next) => {

        // let { email, password, first_name, last_name, middle_name, phone } = decode(req.body.parsed)

    let { email, password, isAdmin, first_name, last_name, middle_name, phone,user_uuid } = req.body

           image = ''


       if(req.file) {
           image = `${req.protocol}://${req.get('host')}/` + req.file.filename
       }
           
    
    try { 
    
       let sql =  `SELECT email from users WHERE email = ?`
       let result = await db.executeQuery(sql,[email])
 

       if(result.length > 0) {
           res.status(401).json({message:'Email is not available'})
           return
       }


            const hashed =  await bcryptjs.hash(password, 10)
            let insertSql = `INSERT INTO users (email, password,isAdmin, first_name,last_name, middle_name, phone,image, user_uuid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
            let insertResult =  await db.insertQuery(insertSql,[email, hashed,isAdmin,first_name, last_name, middle_name, phone, image,user_uuid])


            res.status(200).json({message: 'Account succesfully created', data:{email, first_name, image, user_uuid}})

    }
    catch(err) {
   
        res.status(500).json({message:'Internal server error'})
    }
})





router.put('/update-profile/:id', isAuthenticated,  upload.single('image') , async (req,res) => {

    
    let id = req.params.id
    let {email, password, first_name, last_name, middle_name, phone} = req.body

    let sql = `UPDATE users SET`;
    let values = []




    try {

         let sqlCheck = `SELECT image FROM users WHERE id = ?`

         let checkImg = await db.executeQuery(sqlCheck,[id])
        

         if(checkImg[0].image != null) {
           let splitImg = req.file ?  checkImg[0].image.split('/') : ''



        if(fs.existsSync(`./public/file/${splitImg[splitImg.length - 1]}`)) {

          fs.unlink(`./public/file/${splitImg[splitImg.length - 1]}`, (err) => {
              if(err) {
                  res.status(500).json({message:err})
              }
           })
       }
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


        if(req.file) {
             sql += ` image = ?,`
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


router.delete('/delete-profile/:id', isAuthenticated,async (req,res) => {

    let id = req.params.id

     try {


         let sqlCheck = `SELECT image FROM users WHERE id = ?`
         let checkImg = await db.executeQuery(sqlCheck,[id])
         let splitImg = checkImg[0] ?  checkImg[0].image.split('/') : ''

       
 

    if(fs.existsSync(`./public/file/${splitImg[splitImg.length - 1]}`)) {

          fs.unlink(`./public/file/${splitImg[splitImg.length - 1]}`, (err) => {
              if(err) {
                  res.status(500).json({message:err})
              }
           })
       }




       let sql = `DELETE FROM users WHERE id = ?`
       let result =  await db.executeQuery(sql,[id]);


       res.status(201).json({message:result})
     }  
     catch (err) {
         res.status(500).json({message:'Internal server error'})
     } 
})



router.get('/users',  async (req, res) => {
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone, isAdmin  FROM users;`
        let result = await db.executeQuery(sql)
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})


router.get('/users/:id', isAuthenticated, async (req, res) => {

    const id = req.params.id
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone, isAdmin FROM users WHERE id = ?;`
        let result = await db.executeQuery(sql,[id])
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})




router.get('/users/:limit/:offset', isAuthenticated, async (req, res) => {


    let limit = req.params.limit;
    let offset = req.params.offset;
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone, isAdmin  FROM users WHERE isAdmin = 1 LIMIT ${limit} OFFSET ${offset};`
        let result = await db.executeQuery(sql,[limit,offset])
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})



router.get('/client', isAuthenticated, async (req, res) => {
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone, isAdmin  FROM users WHERE isAdmin = 0`
        let result = await db.executeQuery(sql)
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})




module.exports = router








