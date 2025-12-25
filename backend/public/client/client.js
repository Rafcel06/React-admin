const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../db/database')
const multer = require('multer');
const isAuthenticated = require('../gaurd/authGuard')
const { decode, encode} = require('../encodeDecode/encodeDecode');
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

    

// authentication CRUD


router.post('/client/register',  upload.single('profile'),async (req,res, next) => {

    let { email, password, profile } = req.body

           profile = ''

       if(req.file) {
           profile = `${req.protocol}://${req.get('host')}/` + req.file.filename
       }
           
    
    try { 
    
       let sql =  `SELECT email from chat_users WHERE email = ?`
       let result = await db.executeQuery(sql,[email])
 

       if(result.length > 0) {
           res.status(200).json({message:'Email is not available'})
           return
       }


            const hashed =  await bcryptjs.hash(password, 10)
            let insertSql = `INSERT INTO chat_users (email, password, profile) VALUES(?, ?, ?)`
            let insertResult =  await db.insertQuery(insertSql,[email, hashed, profile])


            res.status(200).json({message: 'Account succesfully created', data: insertResult})

    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})





router.put('/update-client/:id',  upload.single('profile') , async (req,res) => {

    
    let id = req.params.id
    let {email, password } = req.body

    let sql = `UPDATE chat_users SET`;
    let values = []


    try {



         let sqlCheck = `SELECT profile FROM chat_users WHERE id = ?`
         let checkImg = await db.executeQuery(sqlCheck,[id])
         let splitImg = req.file ? checkImg[0].profile.split('/') : ''
  



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

      
        if(req.file) {
             sql += ` profile = ?`
             values.push(`${req.protocol}://${req.host}/${req.file.filename}`)
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


router.delete('/delete-client/:id',async (req,res) => {



    let id = req.params.id

     try {


         let sqlCheck = `SELECT profile FROM chat_users WHERE id = ?`
         let checkImg = await db.executeQuery(sqlCheck,[id])
         console.log(checkImg)
         let splitImg = checkImg[0] ?  checkImg[0].profile.split('/') : ''

       
 

    if(fs.existsSync(`./public/file/${splitImg[splitImg.length - 1]}`)) {

          fs.unlink(`./public/file/${splitImg[splitImg.length - 1]}`, (err) => {
              if(err) {
                  res.status(500).json({message:err})
              }
           })
       }




       let sql = `DELETE FROM chat_users WHERE id = ?`
       let result =  await db.executeQuery(sql,[id]);


       res.status(201).json({message:result})
     }  
     catch (err) {
         res.status(500).json({message:'Internal server error'})
     } 
})



router.get('/client', isAuthenticated, async (req, res) => {
    
    try {

        let sql =  `SELECT  id,email, profile  FROM chat_users;`
        let result = await db.executeQuery(sql)
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})



router.get('/client/:limit/:offset', isAuthenticated, async (req, res) => {


    let limit = req.params.limit;
    let offset = req.params.offset;
    
    try {

        let sql =  `SELECT  id,email, first_name,last_name, middle_name, phone  FROM users LIMIT ${limit} OFFSET ${offset};`
        let result = await db.executeQuery(sql)
        

        res.status(200).json({data:result})
    }
    catch(err) {
        res.status(500).json({message:'Internal server error'})
    }
})



module.exports = router








