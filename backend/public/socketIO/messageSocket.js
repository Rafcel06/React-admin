const express = require('express')
const router = express.Router()
const { Server, Socket } = require("socket.io")
const db = require('../db/database')
const {  v4 } = require('uuid')  


const createIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  })


    
    io.on('connection', (socket) => {
        
     const userId =  socket.handshake.query.userId
     socket.userId = userId

     console.log(userId)
     console.log(socket.userId + " Join the chat")

     socket.join(socket.userId)

     socket.on('message',  async (data) => {   

            if(!data.to) {
                      console.log("from client " + data.message)
                      console.log("from client " + data.dt_message)
                      console.log("from client " + data.images)
                      console.log("from client " + data.user_id)
                      console.log("from client " + data.receiver_id)
                      const {message,dt_message,images,user_id,receiver_id}  = data
     
               try {
                    //  let sql =  "INSERT INTO client_message(message,dt_message,images,user_id,receiver_id) VALUES(?, ?, ?, ?, ?)"
                    //  let results =  await db.insertQuery(sql,[message,dt_message,images,user_id,receiver_id])
                    //  socket.broadcast.emit('send-message-to-admins', data)
                  }
              catch(err) {
                 console.log(err)
                 }   
                return
            }     

             const {message,dt_message,images,user_id,receiver_id}  = data
             
                     console.log("to client " + data.message)
                      console.log("to client " + data.dt_message)
                      console.log("to client " + data.images)
                      console.log("to client " + data.user_id)
                      console.log("to client " + data.receiver_id)

               try {

                    //  let sql =  "INSERT INTO client_message(message,dt_message,images,user_id,receiver) VALUES(?, ?, ?, ?, ?)"
                    //  let results =  await db.insertQuery(sql,[message,dt_message,images,user_id,receiver_id])
                    //  socket.to(data.to).emit('send-message', data)
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
                   console.log(results)
                   socket.emit('show-rooms','data is being updated')
              }
          }

          catch(err) {
              console.log(err)
          }
     })


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


   
     socket.on('disconnect', () => {
       console.log(`User ${socket.id} leave the chat`)
       socket.leave(socket.userId)
     })

})


  return io
}

module.exports = { createIO, router }
