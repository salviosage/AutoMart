const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import  carChema from "../schema/car";
import carUpdate from "../schema/carUpdate";
import carDelete from "../schema/carDelete";
import oneCar from "../schema/oneCar"
import Joi from 'joi';




exports.getAds= (req, res, next) =>{

 let inReturn =[]; // define an array to hold relevant data from database 

  //if user signed in 
  if (req.headers.token){
    
    const token = req.headers.token 
    
    try {
     
      
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      
      const userName = decodedToken.userName;
    
      const role =decodedToken.role;
     
  
      // for admin request 
  if(role && role ==="admin"){
   
       inReturn = cars;
    
      
       
  }
  // for any user signed in 
   else if (role && userName) {
    
    for(let i=0; i<=cars.length-1; i++){
    if(cars[i].owner===userName || cars[i].status==="available"){
      inReturn.push(cars[i]);
      
  }
}


} 
    }

catch {
  return res.status(401).json({
    error: ('Invalid request !')
  });
}
  }else {
    
    for(let i=0; i<=cars.length-1; i++){
      if( cars[i].status==="available"){
        inReturn.push(cars[i]);
    }
        }
      }

  
 
  
  if(inReturn){
    
   
    const state =req.query.state;
    
    const minPrice= parseInt(req.query.min_price);
    const maxPrice= parseInt(req.query.max_price);
    const manufacturer= req.query.manufacturer;
    const body_type= req.query.body_type;
    let carSaleFound= [];
    
    
        //all get specification for cars withou price range specification 
        
        for(let i=0; i<=inReturn.length-1; i++){
          
                   //get car with specified state 
                   if(state  && !manufacturer && !body_type  ) {
                    if( inReturn[i].state===state){
                        carSaleFound.push(inReturn[i]);
                    }
                } 
                //get car with specified manufacturer 
                else if(!state  && manufacturer && !body_type  ) {
                  if( inReturn[i].manufacturer===manufacturer  ){
                    carSaleFound.push(inReturn[i]);
                }
                }
                //get car with specified  body-type
                else if(!state  && !manufacturer && body_type  ) {
                  if( inReturn[i].body_type===body_type ){
                   
                    carSaleFound.push(inReturn[i]);
                }
                }
                //get car with specified manufacturer and body_type
                else if(!state  && manufacturer && body_type  ) {
                  if(inReturn[i].manufacturer===manufacturer && inReturn[i].body_type===body_type ){
                      carSaleFound.push(inReturn[i]);
                  }
              } 
        
            //get car with specified manufactirer body_type and state 
           else  if(state  && manufacturer && body_type  ) {
            if(inReturn[i].state===state && inReturn[i].manufacturer===manufacturer && inReturn[i].body_type===body_type ){
                carSaleFound.push(inReturn[i]);
            }
        } 
        //get car with specified manufacturer and state 
        else if(state  && manufacturer && !body_type  ) {
          if( inReturn[i].manufacturer===manufacturer && inReturn[i].state===state ){
            carSaleFound.push(inReturn[i]);
        }
        }
        //get car with specified state and body-type
        else if(state  && !manufacturer && body_type  ) {
          if(inReturn[i].body_type===body_type  && inReturn[i].state===state){
            carSaleFound.push(inReturn[i]);
        }
        }
        //get car with specified manufacturer and body_type
        else if(!state  && manufacturer && body_type  ) {
          if(inReturn[i].manufacturer===manufacturer && inReturn[i].body_type===body_type){
              carSaleFound.push(inReturn[i]);
          }
      } 
      
        if (carSaleFound.length<=0){
         
          carSaleFound=inReturn;
       
        }
       
          // check if there is specified price range 
          if( (minPrice) && (maxPrice)){
           
            const carFilterByPrice= [];
            for(let j=0; j<=carSaleFound.length-1; j++){
              if((carSaleFound[j].price>=minPrice) && (carSaleFound[j].price<=maxPrice)){
                  carFilterByPrice.push(carSaleFound[j]);
              }
          
            }
         
          //return car filter by price range
          return res.status(320).json({
            status:200,
            data:carFilterByPrice
          })
      }

      `gonna return this array${carSaleFound}  `
        return res.status(302).json({
         
          status:302,
          data: carSaleFound
         
         });
      


    }
   }
   
   else{  // no array to return 
   
      return res.status(400).json({
        status:401,
        error: `no car found `
      });
    }
    
      

   
      }
     
  

  

   
//create a car ad endpoint 
exports.createAd = (req, res, next) => {
  const carAdValidation= Joi.validate(req.body, carChema);
  if(carAdValidation.error){
    return res.status(400).json({
      status:401,
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
 
         return  res.status(201).json({
           status: 201,
            data:newAd
          });
           
  
};
exports.getOneAd =(req, res, next) =>{
  
  const carAdValidation= Joi.validate(req.params, oneCar);
    if(carAdValidation.error){
        return res.status(400).json({
            error: `${carAdValidation.error.details[0].message}`
        });
    }

    
  const car= cars.find(car=> car.id === req.params.id  )
  
        if (!car || car.status !="available") {
          return res.status(401).json({
            error: 'call you want to car not found from one add get!'
          });
        }

  return res.status(200).json({
    status:200,
    data: car
  });
   };



   exports.updateAd= (req, res, next) => {
   
    
    const carAdValidation= Joi.validate(req.body, carUpdate);
    if(carAdValidation.error){
        return res.status(400).json({
            error: `${carAdValidation.error.details[0].message}`
        });
    }
    const car= cars.find(car=> car.id === req.params.id )
    
    
        if (!car || car.status !="available") {
          return res.status(401).json({
            status:401,
            error: ('car not found !')
          });
        }
        
       
       
        let price =car.price;
        let  status=car.status;
        if(req.body.price){
           price= req.body.price
           
        }
        else{
         
          status=req.body.status
        }

        const index = cars.indexOf(car);
     
  
    cars[index].id= car.id,
    cars[index].owner =car.owner, // user id
    cars[index].state = car.state,
    cars[index].price = price ,// price offered
    cars[index].status= status ,
    cars[index].created_on= car.created_on,
    cars[index].modified_on= moment.now()
    
 
         return  res.status(200).json({
           status:200,
           data:car
          });
           
  
};
exports.deleteAd= (req, res, next) => {

  const carAdValidation= Joi.validate(req.params, carDelete);
    if(carAdValidation.error){
        return res.status(400).json({
            error: `${carAdValidation.error.details[0].message}`
        });
    }

  const car= cars.find(car=> car.id === req.params.id )
 
      if (!car) {
        return res.status(401).json({
          error: new Error('car not found !')
        });
      }
      
     
      

      const index = cars.indexOf(car);
      
      cars.splice(index, 1);
     

  
  
       return  res.status(200).json({
         status:200,
         data:"car deleted successfully"
        });
};