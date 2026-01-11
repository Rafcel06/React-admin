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
     socket.on('message', (data) => {   

            if(!data.to) {
                socket.broadcast.emit('send-message-to-admins', data)
                return
            }     

            socket.to(data.to).emit('send-message', data)
          
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

   
     socket.on('disconnect', () => {
       console.log(`User ${socket.id} leave the chat`)
       socket.leave(socket.userId)
     })

})


  return io
}

module.exports = { createIO, router }
