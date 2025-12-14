const express = require('express')
const router = express.Router()
const { Server, Socket } = require("socket.io")
const db = require('../db/database')
const {  v4 } = require('uuid')  

const createIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  })

    const rooms = []
      


    io.on('connection', (socket) => {

     const userId =  socket.handshake.query.userId
     socket.userId = userId


      
     socket.on('message', (data) => {
            socket.broadcast.emit('send-message', data)
     })


     socket.on('create-room', (data) => {
       socket.join(userId)
       rooms.push({ id:data.id, profile : data.profile, name : data.name, socketId: userId })
       socket.broadcast.emit('broadcast-rooms', rooms)

     })


     socket.on('refresh', () => {
            socket.emit('broadcast-rooms', rooms)
     })



     socket.on('reconnect', (data) => {

       let index = rooms.findIndex((find) => find.id === data.id)

       if(rooms.length > 0 ) {
           rooms.splice(index,1)
           rooms.push({ id:data.id, profile : data.profile, name : data.name, socketId : socket.id })
           socket.emit('broadcast-rooms', rooms)
           console.log("reconnect rooms" + rooms)
       }
             
     })



  
   
     socket.on('disconnect', () => {
       console.log(`User ${socket.id} leave the chat`)
     })
})


  return io
}

module.exports = { createIO, router }
