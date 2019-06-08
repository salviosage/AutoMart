const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import {users} from "../db/automart"

export const getUser= (req, res, next) =>{
 console.log(users)
 console.log("cool" )
    res.send(users);
  }


  

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = {
            email: req.body.email,
            password: hash,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            address : req.body.address,
            is_admin : req.body.is_admin,
        };
      users.push(user);
         return  res.status(200).json({
            user
          });
           
        
      }
    );
  };

  exports.login = (req, res, next) => {
    
   const user= users.find(user=> user.email === req.body.email )
    console.log("find start") ;
        if (!user) {
          return res.status(401).json({
            error: "User not found!"
          });
        }
        console.log("bycrypt start ") ;
        const compare =bcrypt.compare(req.body.password, user.password)
            if (!compare) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            console.log("fvalidation passed  jst start") ;
            let role="user";
            
            if(user.is_admin==="true"){
              role="admin"
            }

            const token = jwt.sign(
              { userId: user.id,role:user.role },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
           return  res.status(200).json({
              userId: user._id,
              token: token
            });
         
        
    
  };
  exports.reset = (req, res, next) => {
    
    const user= users.find(user=> user.email === req.body.email )
     console.log("find start") ;
         if (!user) {
           return res.status(401).json({
             error: ('User not found!')
           });
         }
         console.log("reset start ") ;
         
    user.password=user.first_name
    console.log(user)
            return  res.status(200).json({
               userId: user.id,
               message: "your password has been reseted to your first tname"
             });
          
         
     
   };
  
 
  