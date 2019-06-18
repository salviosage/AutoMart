import  bcrypt from'bcrypt';
import  jwt from 'jsonwebtoken';
import uuid from 'uuid';
import {users} from "../db/automart";
import table from '../db/db';
import helper from '../middleware/helper'
import mart from '../db/db'


 const getUser= (req, res, next) =>{

  
  return  res.status(200).json({
    status:200,
    data: users,
    
    });
  }

  

const signup = async (req, res, next) => {

const isAvailable= await mart.selectCount(users,email,req.body.email);
if (isAvailable)
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
      
      if(user.is_admin){
        role="admin"
      }
      console.log(user)
     
     
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

 const login =  async(req, res) => {
  const sql = `
  SELECT * FROM users
  WHERE username = '${req.body.username}' AND password = '${req.body.password}'
  `;
  table.pool.query(sql)
        .then((resp)=>{
            
            if(resp.rows.length > 0){
                
                const {id, username} = resp.rows[0];
                const load = {
                     id,
                     username
                   };   
            //create a token
              some.sign(req,res,load, 200);      
            }
           else{
            return res.status(401).send({
                status:401,
                error: "Username or Password is Incorrect"
            })
        }
         
        })
    
   const user= users.find(user=> user.email === req.body.email )
    
        if (!user) {
          return res.status(401).json({
            status:401,
            error: "User not found!"
          });
        }

        const compare = await bcrypt.compare(req.body.password, user.password)
        console.log('value',compare)
            if (!compare) {
              return res.status(401).json({
                status:401,
                error:'Incorrect password!'
              });
           }
            
            let role="user";
            
            if(user.is_admin){
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

const reset = (req, res, next) => {
  
    console.log("found")
    const user= users.find(user=> user.email === req.body.email );

    console.log('user',user)
    
         if (user==={}) {
           console.log("found")
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
   export  {
     login,signup,reset,getUser
   }
  
 
  