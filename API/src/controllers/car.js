const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart"


export const getAds= (req, res, next) =>{
 console.log(cars)
 console.log("cool" )
    res.send(cars);
  }
   

exports.createAd = (req, res, next) => {
  console.log("here we go ");

 
  const newAd = {
    id: uuid.v4(),
    owner: req.body.owner,
    state: req.body.state || 'new',
    status: req.body.status || 'available',
    body_type:req.body.body_type,
    model:req.body.model,
    manufacturer:req.body.manufacturer,
    price:req.body.price,
    created_on: moment.now(),
    modified_on: moment.now()
  };
  cars.push(newAd);
         return  res.status(200).json({
            newAd
          });
           
  
};

