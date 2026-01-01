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


      
     socket.on('message', (data) => {
            socket.broadcast.emit('send-message', data)
     })

   
     socket.on('disconnect', () => {
       console.log(`User ${socket.id} leave the chat`)
     })
     
})


  return io
}

module.exports = { createIO, router }
