const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";





const getAds= (req, res, next) =>{

 let inReturn =[]; 
 let toReturn=[];
  
  if(req.auth.role && req.auth.role==="admin"){
   
       inReturn = cars;
  
  }
  
   else if (req.auth.role ) {

    for(let i=0; i<=cars.length-1; i++){
    if(cars[i].contact===req.auth.userName || cars[i].status==="available"){
      inReturn.push(cars[i]);
      
  }
}
}
else {
    
    for(let i=0; i<=cars.length-1; i++){
      if( cars[i].status==="available"){
        inReturn.push(cars[i]);
    }
        }
      }

  
      
  if(req.query!=null){
    
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
    }
        if (carSaleFound.length<=0){
          
         
          carSaleFound=inReturn;
          inReturn=carSaleFound
       
        }

          // check if there is specified price range 
          if( (minPrice) && (maxPrice)){
           
            const carFilterByPrice= [];
            for(let j=0; j<=carSaleFound.length-1; j++){
              if((carSaleFound[j].price>=minPrice) && (carSaleFound[j].price<=maxPrice)){
                  carFilterByPrice.push(carSaleFound[j]);
              }
          
            }

          
        
         if (carFilterByPrice.length>0){
           inReturn=carFilterByPrice
         }
    
      }
    
       if (req.query.status ) {
     
        for(let i=0; i<=inReturn.length-1; i++){
          
        if( inReturn[i].status===req.query.status){
          toReturn.push(inReturn[i]);
          
      }
    }
    return res.status(302).json({
         
      status:302,
      data: toReturn
     
     });
  
    }
   
     
        return res.status(302).json({
         
          status:302,
          data: inReturn
         
         });
      


    }
   else if (inReturn.length>0){
 
    return res.status(320).json({
      status:200,
      data:inReturn
    })
   }
   
   else{  // no array to return 
   
      return res.status(400).json({
        status:401,
        error: `no car found `
      });
    }
    
      

   
      }
     
  

  

   
//create a car ad endpoint 
const createAd = (req, res, next) => {
 

  const newAd = {
    id: uuid.v4(),
    owner: req.auth.userName,
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
const getOneAd =(req, res, next) =>{
  
  

    
  const car= cars.find(car=> car.id === req.params.id  )
  
        if (!car ||car.status !="available" || (car.owner!=req.auth.userName &&req.auth.role!="admin")) {
          return res.status(401).json({
            status:401,
            error: 'call you want to car not found from one add get!'
          });
        }
        


  return res.status(200).json({
    status:200,
    data: car
  });
   };



  const updateAd= (req, res, next) => {
   
    
   
    const car= cars.find(car=> car.id === req.params.id )
    
    console.log(car)
        if (!car || car.owner!=req.auth.userName  ) {
          return res.status(401).json({
            status:401,
            error: 'access denied invalid request !'
          });
        }
        else{
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
      cars[index].status= status, 
      cars[index].price= price,
      cars[index].created_on= car.created_on,
      cars[index].modified_on= moment.now()
      
   
           return  res.status(200).json({
             status:200,
             data:car
            });
             
    

        }
        
       
       
        
};
const deleteAd= (req, res, next) => {

  

  const car= cars.find(car=> car.id === req.params.id )

  
      if (!car || car.owner!=req.auth.userName || req.auth.role!="admin") {
        return res.status(401).json({
          error: 'access denied  !'
        });
      }
      
     
      

      const index = cars.indexOf(car);
      
      cars.splice(index, 1);
     

  
  
       return  res.status(200).json({
         status:200,
         data:"car deleted successfully"
        });
};
export default {
  getAds,getOneAd,createAd,deleteAd,updateAd
}