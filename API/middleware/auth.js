const jwt = require('jsonwebtoken');
import {users} from "../db/automart"


module.exports = (req, res, next) => {
  console.log(req.headers)
  try {
    console.log("try started ")
    const token = req.headers.token
   
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    
    const userName = decodedToken.userName;
   
    const role =decodedToken.role;
    
    const user= users.find(user=> user.email === userName )
    console.log("find start") ;

    if (!user ) {
      res.status(401).json({
        status:401,
        error: 'Authentiction failed '
      });
    } else {
      console.log("user found ")
      next();
    }
  } catch {
    console.log("authentication failed")
    res.status(401).json({
      status:401,
      error: 'Invalid request! you must login first '
    });
  }
};