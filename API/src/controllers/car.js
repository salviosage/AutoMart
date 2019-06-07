const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart"


export const getAds= (req, res, next) =>{
 console.log(cars)
 console.log("cool" )
    res.send(cars);
  };
   

exports.createAd = (req, res, next) => {

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
exports.getOneAd =(req, res, next) =>{

  const car= cars.find(car=> car.id === req.body.id  )
    console.log("then here second ")
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: new Error('call you want to car not found!')
          });
        }
  console.log(car)
  console.log("cool" )
     res.send(car);
   };



   exports.updateAd= (req, res, next) => {
    console.log(req.params)

    const car= cars.find(car=> car.id === req.params.id )
    console.log("then here second ")
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: new Error('car not found !')
          });
        }
        
       
        console.log("gotta add an car ")

        const index = cars.indexOf(car);
        console.log(index)
        console.log(cars[index])
        
        console.log(req.body)
  
    cars[index].id= car.id,
    cars[index].owner =car.owner, // user id
    cars[index].state = car.state,
    cars[index].price = req.body.price  || cars.price ,// price offered
    cars[index].status=  req.body.status  || car.status ,
    cars[index].created_on= car.created_on,
    cars[index].modified_on= moment.now()
    console.log(cars[index])
 
         return  res.status(200).json({
            car
          });
           
  
};
exports.deleteAd= (req, res, next) => {
  console.log(req.params)

  const car= cars.find(car=> car.id === req.params.id )
  console.log("then here second ")
      if (!car) {
        return res.status(401).json({
          error: new Error('car not found !')
        });
      }
      
     
      console.log("gotta delete ")

      const index = cars.indexOf(car);
      console.log(index)
      console.log(cars[index])
      cars.splice(index, 1);
      console.log(req.body)

  
  console.log(cars[index])

       return  res.status(200).json({
          cars
        });
         

};