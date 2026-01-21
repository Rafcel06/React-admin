const express = require('express')
const router = express.Router()
const { Server, Socket } = require("socket.io")
const db = require('../db/database')
const {  v4 } = require('uuid')  
const fs = require('fs')
const moment = require("moment")


const createIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  })


  const createOnlineStatus = (content) =>{
             fs.writeFile('onlineStatus.txt', JSON.stringify(content), "utf8", (err) => {
                  if(err) {
                     console.log(err)
                  }
                  console.log('Succesfully created temporary history')
               })   
  }


   const createAdminOnlineStatus = (content) =>{
             fs.writeFile('onlineAdminStatus.txt', JSON.stringify(content), "utf8", (err) => {
                  if(err) {
                     console.log(err)
                  }
                  console.log('Succesfully created temporary history')
               })   
  }








    const allRoom = []

    io.on('connection', (socket) => {
         
     const userId =  socket.handshake.query.userId
     socket.userId = userId
     

     socket.join(socket.userId)
     allRoom.push(socket.userId)


  // Client online status from admin view

     socket.on('online-status', (data) => {
           socket.broadcast.emit('online-room', allRoom)
     })

     socket.on('admin-refresh-client-online', (data) => {
         fs.readFile('onlineStatus.txt', 'utf8', (err,data) => {
           if(err) {
            console.log(err)
           }
             socket.emit('online-room', data)
        })
     })


     
  // Admin online status from client view



   socket.on("admin-status", (data) => {
     socket.broadcast.emit("admin-update-status", data)
   })

   

     socket.on('message',  async (data) => { 
         
        let date = ""


            if(!data.to) {
    
               const {message,dt_message,images,user_id,receiver_id, isAdmin,room, profile}  = data
               date = moment(dt_message).format()
        
               try {
                     let sql =  "INSERT INTO client_message(message,dt_message,images,user_id,receiver_id,isAdmin,room, profile) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
                     let results =  await db.insertQuery(sql,[message,date,images,user_id,receiver_id, isAdmin, room, profile])
                     socket.broadcast.emit('send-message-to-admins', data)
                  }
              catch(err) {
                 console.log(err)
                 }   
                return
            }     

             const {message,dt_message,images,user_id,receiver_id, isAdmin,room, profile}  = data
             
                   date = moment(dt_message).format()
               try {

                     let sql =  "INSERT INTO client_message(message,dt_message,images,user_id,receiver_id, isAdmin, room, profile) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
                     let results =  await db.insertQuery(sql,[message,date,images,user_id,receiver_id, isAdmin,room, profile])
                     socket.to(data.to).emit('send-message', data)
                  }
              catch(err) {
                 console.log(err)
                 }   
              
          
     })


     socket.on('update-uuid',async (data) => {

          try {
              let sql = 'UPDATE users SET user_uuid = ? WHERE id = ? '
              let result = await db.executeQuery(sql,[data.uuid, data.id])

              if(result) {
                   let sql =  "SELECT email,first_name,image,id,isAdmin, user_uuid FROM users WHERE isAdmin = 0"
                   let results =  await db.executeQuery(sql)
                   socket.emit('show-rooms','data is being updated')
              }
          }

          catch(err) {
              console.log(err)
          }
     })

    //  socket.on('update-uuid-admin',async (data) => {

    //       try {
    //           let sql = 'UPDATE users SET user_uuid = ? WHERE id = ? '
    //           let result = await db.executeQuery(sql,[data.uuid, data.id])

    //           if(result) {
    //                let sql =  "SELECT email,first_name,image,id,isAdmin, user_uuid FROM users WHERE isAdmin = 0"
    //                let results =  await db.executeQuery(sql)
    //           }
    //       }

    //       catch(err) {
    //           console.log(err)
    //       }
    //  })


    socket.on('room',  async (data) => {

      try {
        let sql =  "SELECT email,first_name,image,id,isAdmin, user_uuid FROM users WHERE isAdmin = 0"
        let results =  await db.executeQuery(sql)
        socket.emit('show-rooms',results)
      }
      catch(err) {
       console.log(err)
      }
     })





      socket.on('create-room-client',  async (data) => {
      try {
        let sql =  "SELECT email,first_name,image,id,isAdmin, user_uuid FROM users WHERE isAdmin = 0"
        let results =  await db.executeQuery(sql)
        socket.broadcast.emit('show-rooms',results)
      }
      catch(err) {
       console.log(err)
      }
     })


     socket.on('history-chat', async (data) => {

      const { room } = data

       try {
               let sql = 'SELECT * FROM client_message WHERE room = ? ORDER BY dt_message ASC;'
               let result = await  db.executeQuery(sql,[room])
               socket.emit('get-chat-history', result)
    
     
       }
       catch(err) { 
              console.log(err)
       }

     })




   
     socket.on('disconnect', () => {
      
       let index = allRoom.indexOf(socket.userId)
       allRoom.splice(index,1)
       createOnlineStatus(allRoom)
       socket.broadcast.emit('online-room', allRoom)
       console.log(`User ${socket.userId} leave the chat`)
       socket.leave(socket.userId)
     })

})


  return io
}

module.exports = { createIO, router }
