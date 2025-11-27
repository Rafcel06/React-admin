    const jwt = require('jsonwebtoken')
    
    
    const isAuthenticated =  async (req, res, next)  => {
      
    try  {  


      const token  = req.headers.authorization.split(' ')[1] 
      const decode = jwt.verify(token,process.env.AUTHENTICATED_SECRET_KEY)

      if (decode.exp <= Date.now() / 1000) {
        return res.status(401).json({ data: 'Token expired' });
      }
     
      req.user = decode
      next()

    }

    catch(err) {

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ data: 'Session is expired' });
      }

      res.status(500).json({data:'Request not allowed'})
    }
}



    module.exports = isAuthenticated    