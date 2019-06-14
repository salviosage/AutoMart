const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import {flags} from "../db/automart"
import flagSchema from "../schema/flag";
import Joi from 'joi'

export const getAllFlag= (req, res, next) =>{
  if (req.auth.role!="admin"){
    return res.status(400).json({
      error: 'access denied'
    });
  }
  else{
    return res.status(200).json({
      status:200,
      data:flags
    });
  }
  
    
  }
exports.createFlag = (req, res, next) => {
  console.log(req.auth)
  const flagValidation= Joi.validate(req.body, flagSchema);
  if(flagValidation.error){
    return res.status(400).json({
      error_msg: `${flagValidation.error.details[0].message}`
  });
  }
    

    const car= cars.find(car=> car.id === req.body.car_id  )
    
        if (!car || car.status !="available") {
          return res.status(401).json({
            status:401,
            error: 'car you want to flag  not found!'
          });
        }
        
       
        
  const newFlag
   = {
    id: uuid.v4(),
    contact : req.auth.userName, 
    car_id : req.body.car_id,
    reason : req.body.reason, // price offered
    discription: req.body.description || '',
    created_on: moment.now(),
    
  };
  flags.push(newFlag);
         return  res.status(200).json({
           status:200,
            data: newFlag
          });
           
  
};