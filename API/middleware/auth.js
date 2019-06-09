const jwt = require('jsonwebtoken');
import {users} from "../db/automart"


module.exports = (req, res, next) => {
  console.log(req.headers)
  try {
    console.log("try started ")
    const token = req.headers.token
    console.log("try started ")
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken)
    const userName = decodedToken.userName;
    console.log(userName);
    const role =decodedToken.role;
    console.log(role);
    const user= users.find(user=> user.email === userName )
    console.log("find start") ;

    if (!user ) {
      res.status(401).json({
        error: 'Authentiction failed '
      });
    } else {
      console.log("user found ")
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request! you must login first '
    });
  }
};