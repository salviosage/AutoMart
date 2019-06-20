const jwt = require('jsonwebtoken');
import env from "dotenv"; 
env.config()

let validateToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if(!token){
      return res.status(401).send({
        status:401,
        error:"Unauthorized access"
      })
    }  
  if (token.startsWith('Bearer ')) {
  
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, process.env.secret_key, (err, decode) => {
        if (err) {
          return res.send({
            status:401,
            success: false,
            message: 'Token is not valid'
          });
      
        } else {
          console.log(decode)
          req.auth = decode;
          next();
        }
      });
    } else {
      return res.send({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };
  
  
  export default validateToken;