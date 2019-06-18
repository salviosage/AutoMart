const jwt = require('jsonwebtoken');
import {users} from "../db/automart"
import env from "dotenv"; 
env.config()


module.exports = (req, res, next) => {
  if(req.headers.token){
  try {
    
    const token = req.headers.token;
   
    const decodedToken = jwt.verify(token,process.env.secret-key);
    console.log(decodedToken)
    
    const userName = decodedToken.userName;
   
    const role =decodedToken.role;
    
    const user= users.find(user=> user.email === userName )
    

    if (!user ) {
      res.status(401).json({
        status:401,
        error: 'Authentiction failed '
      });
    } else {
      req.auth=decodedToken,
      
      next();
    }
  } catch(error) {
   
    res.status(401).json({
      status:401,
      error
    });
  }
}
else {
  
    res.status(401).json({
      status:401,
      error: 'Invalid request! you must login first '
    });
}
};