import  bcrypt from'bcrypt';
import  jwt from 'jsonwebtoken';
import uuid from 'uuid';
import {users} from "../db/automart";
import Joi from 'joi';
import userSchema from '../schema/user';
import accountSchema from '../schema/account';
import resetSchema from '../schema/passwordReset'

export const getUser= (req, res, next) =>{

  
  return  res.status(200).json({
    status:200,
    data: users,
    
    });
  }

  

exports.signup = (req, res, next) => {
  const accountValidation= Joi.validate(req.body, accountSchema);
  if(accountValidation.error){
    return res.status(400).json({
      error_msg: `${accountValidation.error.details[0].message} got some eror in validation`
  });
  }
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
     
      let role="user";
      
      if(user.is_admin==="true"){
        role="admin"
      }
     
     
      const userName =user.email
     

      const token = jwt.sign(
        { userName:userName,role:role },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' });
     return  res.status(200).json({
      status:200,
      token: token,
      message:"successfully logged in ",
      userName: user.email,
      });
 
      }
    );
  };

  exports.login = (req, res) => {
    const userValidation= Joi.validate(req.body, userSchema);
    if(userValidation.error){
      return res.status(400).json({
        sttus:400,
        error_msg: `${userValidation.error.details[0].message}`
    });
    }
    
   const user= users.find(user=> user.email === req.body.email )
    
        if (!user) {
          return res.status(401).json({
            status:401,
            error: "User not found!"
          });
        }
       
        const compare =bcrypt.compare(req.body.password, user.password)
            if (!compare) {
              return res.status(401).json({
                status:401,
                error: new Error('Incorrect password!')
              });
            }
            
            let role="user";
            
            if(user.is_admin==="true"){
              role="admin"
            }
         

            const token = jwt.sign(
              { userName: user.email, role:role },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
           return  res.status(200).json({
              status:200,
              token: token,
              message:"successfully logged in ",
              userName: user.email,
              
            });
         
        
    
  };

  exports.reset = (req, res, next) => {
    const resetValidation= Joi.validate(req.body, resetSchema);
    if(resetValidation.error){
      return res.status(400).json({
        error_msg: `${resetValidation.error.details[0].message}`
    });
    }
    
    const user= users.find(user=> user.email === req.body.email )
    
         if (!user) {
           return res.status(401).json({
             error: ('User not found!')
           });
         }
        
        const hash= bcrypt.hash(user.first_name, 10);
        
      user.password= hash
      
            return  res.status(200).json({
               status:200,
               userName: user.email,
               message: "your password has been reseted to your first name"
             });
          
         
     
   };
  
 
  