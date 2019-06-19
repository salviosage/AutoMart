import {User} from '../models/user';
import helper from '../middleware/helper'
import Database from '../db/automrtdb';
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
    console.log(result.rows[0])
    
    if (result.rows[0].count === '0') {
        //  Hash password
        const hashedPassword = await helper.hashPassword(req.body.password);
        const user = new User( req.body.email, req.body.first_name, req.body.last_name, hashedPassword, req.body.address, req.body.is_admin );
        console.log(user);
        try {
          const token = await helper.generateToken(req.body.email,req.body.is_admin);
          const insertedUser = await mart.addUser(user);
         
            return  res.status(200).json({
              status:200,
              token:token,
              message: 'User registered sucessfuly!' ,
              insertedUser:insertedUser
        
            });
        } catch (error) {
           console.log('error login ',error)
            return  res.status(404).json({
              status:404,
              error: 'error.error' ,
        
            });
        }
    }
    else{
      return  res.status(404).json({
        status:404,
        error: `Email with this ${req.body.email} do exist!`,
  
      });
    }
};



 const login =  async(req, res) => {
  const result = await mart.selectBy('users', 'email', req.body.email);
    if (result.rowCount > 0) {
    
        const validPassword = await helper.comparePassword( result.rows[0].password,req.body.password);
       
        const token = await helper.generateToken(req.body.email,result.rows[0].is_admin);
        if (!validPassword) return res.send('Password is not correct.');
        
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
    if (result.rowCount > 0) {
    
      
        const hashedPassword = await helper.hashPassword(result.rows[0].last_name);
       
      const passResult = await mart.updatePassword({'password': hashedPassword, 'id': result.rows[0].id});
        
        return  res.status(200).json({
          status:200,
          message: 'password resetted to your lastName in capytal letter  success fully !',
          
        });  
    }
    else{
      

        return  res.status(401).json({
          status:401,
          error: `Email with this ${req.body.email} doesn't exist!`,
        });
    }
};
  
    
   export  {
     login,signup,reset,getUser
   }
  
 
  