import  bcrypt from'bcrypt';
import  jwt from 'jsonwebtoken';
import env from "dotenv"; 
env.config()


const sign  = (req, res, next,data) => {
    if(req.headers.token){
    try {
      
        const token = jwt.sign(
            { userName:data.userName,role:data.role },
            process.env.secret-key,
            { expiresIn: '24h' });
      
  
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