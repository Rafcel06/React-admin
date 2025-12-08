const express = require('express')
const router = express.Router()

const { Server } = require("socket.io")


const createIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  })
      
    io.on('connection', (socket) => {

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
