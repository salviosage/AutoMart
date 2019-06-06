const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import {orders} from "../db/automart"


export const geAllOrder= (req, res, next) =>{
 console.log(cars)
 console.log("cool" )
    res.send(orders);
  }
   
 
exports.createOrder = (req, res, next) => {
    console.log("im here ")

    const car= cars.find(car=> car.id === req.body.car_id  )
    console.log("then here second ")
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: new Error('call you want to order not found!')
          });
        }
        
       
        console.log("gotta add an order ")
  const newOrder
   = {
    id: uuid.v4(),
    buyer : req.body.buyer, // user id
    car_id : req.body.car_id,
    amount : req.body.amount, // price offered
    status: req.body.status || 'pending',
    created_on: moment.now(),
    modified_on: moment.now()
  };
  orders.push(newOrder);
         return  res.status(200).json({
            newOrder
          });
           
  
};
