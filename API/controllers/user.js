import  bcrypt from'bcrypt';
import  jwt from 'jsonwebtoken';
import uuid from 'uuid';
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
            id: uuid.v4(),
            email: req.body.email,
            password: hash,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            address : req.body.address,
            is_admin : req.body.is_admin,
        };
      users.push(user);
      console.log("fvalidation passed  jst start") ;
      let role="user";
      
      if(user.is_admin==="true"){
        role="admin"
      }
      console.log(role)
     
      const userName =user.email
      console.log(userName)

      const token = jwt.sign(
        { userName:userName,role:role },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' });
     return  res.status(200).json({
        message: "successfully account created and loged in ",
        userName:user.email,
        token: token
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
            console.log("validation passed  jst start") ;
            let role="user";
            
            if(user.is_admin==="true"){
              role="admin"
            }
            console.log(role)

            const token = jwt.sign(
              { userName: user.email, role:role },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
           return  res.status(200).json({
              message:"successfully logged in ",
              userName: user.email,
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
        const hash= bcrypt.hash(user.first_name, 10);

      usee.password= hash
    console.log(user)
            return  res.status(200).json({
               userId: user.id,
               message: "your password has been reseted to your first name"
             });
          
         
     
   };
  
 
  