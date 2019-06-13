const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import {orders} from "../db/automart";
import orderSchema from "../schema/order";
import Joi from 'joi';

import  orderPriceUpdateSchema from "../schema/orderPriceChange";
import orderStatusUpdateChema from '../schema/orderStatusUpdate';


export const geAllOrder= (req, res, next) =>{

    res.send(orders);
  }
   
 
exports.createOrder = (req, res, next) => {
   
    const orderValidation= Joi.validate(req.body, orderSchema);
    if(orderValidation.error){
      return res.status(400).json({
        error_msg: `${orderValidation.error.details[0].message}`
    });
    }

    const car= cars.find(car=> car.id === req.body.car_id  )
    
        if (!car || car.status !="available") {
          return res.status(400).json({
            error: new Error('call you want to order not found!')
          });
        }
        
       
      
  const newOrder
   = {
    id: uuid.v4(),
    contact : req.body.contact, // user id
    car_id : req.body.car_id,
    amount : req.body.amount, // price offered
    status:  'pending',
    created_on: moment.now(),
    modified_on: moment.now()
  };
  orders.push(newOrder);
         return  res.status(200).json({
           status:200,
            data:newOrder
          });
           
  
};
exports.updateOrderPrice = (req, res, next) => {
    
   
    const orderUpdateValidation= Joi.validate(req.body, orderPriceUpdateSchema);
    if(orderUpdateValidation.error){
      return res.status(400).json({
        error_msg: `${orderUpdateValidation.error.details[0].message}`
    });
    }

    const order= orders.find(order=> order.id === req.params.id )
    
        if (!order || order.status !="pending" || order.buyer !=req.body.contacts) {
          return res.status(401).json({
            status:401,
            error: new Error('invalid request!')
          });
        }
        
       
       

        const index = orders.indexOf(order);
        
  
    orders[index].id= order.id,
    orders[index].buyer =order.buyer, // user id
    orders[index].car_id = order.car_id,
    orders[index].amount =  orders.amount ||req.body.amount, // price offered
    orders[index].status= order.satus   
    orders[index].created_on= order.created_on,
    orders[index].modified_on= moment.now()
    
 
         return  res.status(200).json({
           status:200,
            data:order
          });
           
  
};
exports.updateOrderStatus = (req, res, next) => {

  const orderStatusUpdate= Joi.validate(req.body, orderStatusUpdateChema);
  if(orderStatusUpdate.error){
    return res.status(400).json({
      error_msg: `${orderStatusUpdate.error.details[0].message}`
  });
  }

  const order= orders.find(order=> order.id === req.params.id )
  
      if (!order || order.status !="pending") {
        return res.status(401).json({
          status:401,
          error: ('order you want to edit not found!')
        });
      }

      
     const car =cars.find(car => car.id===order.car_id)
     if (!car || car.owner!=req.body.contact){
      return res.status(401).json({
        status:401,
        error: ('invalid request !')
      });
     }
    

   

      const index = orders.indexOf(order); 
      

  orders[index].id= order.id,
  orders[index].buyer =order.buyer, // user id
  orders[index].car_id = order.car_id,
  orders[index].amount =  orders.amaout  // price offered
  orders[index].status= order.satus   || req.body.status,
  orders[index].created_on= order.created_on,
  orders[index].modified_on= moment.now()


       return  res.status(200).json({
          status:200,
          data:order
        });
         

};
    

