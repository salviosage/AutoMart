const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import  carChema from "../schema/car"
import carUpdate from "../schema/carUpdate"



exports.getAds= (req, res, next) =>{
  console.log("here");
  console.log(req.query)
  if(req.query){
    const state =req.query.state;
    const status = req.query.status;
    const minPrice= parseInt(req.query.min_price);
    const maxPrice= parseInt(req.query.max_price);
    const manufacturer= req.query.manufacturer;
    const body_type= req.query.body_type;
    const carSaleFound= [];
    
    if((status==='available') && !(state) && !(minPrice) && !(maxPrice)){
      
      //Get all unsold cars by status=available
      for(let i=0; i<=cars.length-1; i++){
          if(cars[i].status===status){
              carSaleFound.push(car[i]);
          }
      }
      if (carSaleFound.length>0){
        return res.status(302).json({
          data: carSaleFound
      });
      }return res.status(400).json({
        error: `no car found `
      });
  }

  if((status==='available') && ( state ==='new') && !(minPrice) && !(maxPrice)){
      
    //Get all unsold cars by status=available
    for(let i=0; i<=cars.length-1; i++){
        if(cars[i].status===status && cars[i].state===state){
            carSaleFound.push(cars[i]);
        }
    }
    if (carSaleFound.length>0){
      return res.status(302).json({
        data: carSaleFound
    });
    }
    return res.status(400).json({
      error: `no car found `
    });
    
}
return res.status(400).json({
  error: `no car found `
});
};
 console.log(cars)
 console.log("cool" )
    res.send(cars);
  };

   

exports.createAd = (req, res, next) => {
  const carAdValidation= Joi.validate(req.body, carChema);
  if(carAdValidation.error){
    return res.status(400).json({
      error_msg: `${carAdValidation.error.details[0].message}`
  });
  }

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
    
    const carAdValidation= Joi.validate(req.body, carUpdate);
    if(carAdValidation.error){
        return res.status(400).json({
            error: `${carAdValidation.error.details[0].message}`
        });
    }
    const car= cars.find(car=> car.id === req.params.id )
    console.log("then here second ")
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: new Error('car not found !')
          });
        }
        
       
        console.log("gotta add an car ")
        let price =car.price;
        let  status=car.status;
        if(req.body.price){
           price= req.body.price
           
        }
        else{
         
          status=req.body.status
        }

        const index = cars.indexOf(car);
        console.log(index)
        console.log(cars[index])
        
        console.log(req.body)
  
    cars[index].id= car.id,
    cars[index].owner =car.owner, // user id
    cars[index].state = car.state,
    cars[index].price = price ,// price offered
    cars[index].status= status ,
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