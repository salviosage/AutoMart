import  bcrypt from'bcrypt';
import  jwt from 'jsonwebtoken';
import uuid from 'uuid';
import {users} from "../db/automart";
import table from '../db/db';
import Helper from '../middleware/helper'
const helper =new Helper();
import Database from '../db/automrtdb'
const mart = new Database();


 const getUser= (req, res, next) =>{

  
  return  res.status(200).json({
    status:200,
    data: users,
    
    });
  }

  

const signup = async (req, res, next) => {
  
    //  Check if user exist
    const result = await mart.selectCount('users', 'email', req.body.email);
    
    if (result.rows[0].count === '0') {
        //  Hash password
        const hashedPassword = await helper.hashedPassword(req.body.password);
        const user = new User( req.body.email, req.body.first_name, req.body.last_name, hashedPassword, req.body.address, req.body.is_admin );
        let result;
        try {
            return  res.status(200).json({
              status:200,
              message: 'User registered sucessfuly!' ,
        
            });
        } catch (error) {
           
            return  res.status(404).json({
              status:404,
              error: error.error ,
        
            });
        }
    }
    else{
      return  res.status(404).json({
        status:404,
        error: `Email with this ${req.body.email} do exist!`,
  
      });
    }

    return;
};



 const login =  async(req, res) => {
  const result = await mart.selectBy('users', 'email', req.body.email);
    if (result.rowCount > 0) {
        const validPassword = await helper.comparePassword( result.rows[0].password,req.body.password);
        if (!validPassword) return res.send('Password is not correct.');
        const token =helper.generateToken(req.body.email,req.body.is_admin);
        return  res.status(200).json({
          status:200,
          message: 'User sign in is sucessfuly!',
          token: token,
        });
         
    }
    else{
      

        return  res.status(401).json({
          status:401,
          error: `Email with this ${req.body.email} doesn't exist!`,
        });
    }
};
 

const reset = async(req, res, next) => {
  const result = await mart.selectBy('users', 'email', req.body.email);
  if (result.rows[0].count === '0') {
    //  Hash password
   
   
    
    try {
      return res.status(200).json({
        status:200,
        error:  'password has been reseted to your first name '
      });
       
        
    } catch (error) {
       
        return res.status(404).json({
          status:404,
          error: error.error 
        });
    }
}
else{
    return res.status(404).json({
      status:404,
      error: `User with this email exist.`
    });
}
};
  
    
   export  {
     login,signup,reset,getUser
   }
  
 
  