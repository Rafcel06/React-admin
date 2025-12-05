const express = require('express')
const isAuthenticated = require('./public/gaurd/authGuard')
const authenticate = require('./public/authentication/authenticate')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const app = express()
const cors = require('cors')
const http =  require('http')  
const socketIo = require('socket.io')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public/file')))
app.use(cors())

 const server = http.createServer(app);
  const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        },
        connectionStateRecovery: {}
      }
    )



app.use('/api/v1', authenticate)


io.on('connection', (socket) => {

     socket.on('message', (data) => {
      console.log(socket.id)
        socket.broadcast.emit('send-message', {message : data, socketId : socket.id})
     })


     socket.on('disconnect', () => {
       console.log(`User ${socket.id} leave the room`)
     })
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get(/(.*)/, (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});




