const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import {flags} from "../db/automart"


export const geAllFlag= (req, res, next) =>{
 console.log(cars)
 console.log("cool" )
    res.send(orders);
  }
   
 
exports.createFlag = (req, res, next) => {
    console.log("im here ")
    console.log(cars )
    console.log(req.body )

    const car= cars.find(car=> car.id === req.body.car_id  )
    console.log(car)
    console.log("then here second ")
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: 'call you want to flag  not found!'
          });
        }
        
        console.log(req.body.description)
        console.log("gotta add a flag ")
        
  const newFlag
   = {
    id: uuid.v4(),
    buyer : req.body.buyer, // user id
    car_id : req.body.car_id,
    reason : req.body.reason, // price offered
    discription: req.body.description || '',
    created_on: moment.now(),
    
  };
  flags.push(newFlag);
         return  res.status(200).json({
            newFlag
          });
           
  
};