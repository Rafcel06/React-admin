const express = require('express')
const isAuthenticated = require('./public/gaurd/authGuard')
const authenticate = require('./public/authentication/authenticate')
const path = require('path')
require('dotenv').config()
const session = require('express-session')
const PORT = process.env.PORT || 4000
const app = express()
const cors = require('cors')
const fs = require('fs') 
  
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public/file')))
app.use(cors())

app.use(session({
    secret : process.env.SESSION_SECRET_KEY,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 3600000,
        // secure : true,
        // httpOnly : true

    }
}))





app.use('/api/v1', authenticate)


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



app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`)
})

