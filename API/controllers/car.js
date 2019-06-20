
import  Database from '../db/automrtdb';
import {Car} from '../models/car';
import helper from '../middleware/helper'
const mart = new Database();


const getAds = async (req, res) => {
    var min_price = req.query.min_price;
    var max_price = req.query.max_price;
    const body_type= req.query.body_type;
    const manufacturer = req.query.manufacturer;
    const status= req.query.status;
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (token){
    const auth = await helper.verifyToken(token);
    if (auth ){
      if(auth.role){
        var allCar = await mart.selectAll("cars");
        res.status(200).send({
          'status' : 200,
          'data' :  allCar.rows,
      });
      } else {
        const user = await mart.selectCount('users', 'email', auth.userName);
        if(user.rowCount > 0){
           if(status) {
            var queryavailable = await mart.selectAv(user.rows[0].id);
            if (queryavailable.rows.length>0){
              res.status(200).send({
                'status' : 200,
                'data' :  queryMax.rows
            });
            }
            else{
              res.status(401).send({
                'status' : 401,
                'message':`No carsfound`,
               
            });
            }
            
            }
          var allCar = await mart.selectBy("car",'owner',user.rows[0].id);
          if(allCar.rows.length>0){
          res.status(200).send({
            'status' : 200,
            'data' :  allCar.rows
        });
      }else{
        res.status(401).send({
          'status' : 401,
          'message':`No carsfound`,
         
      });
      }

        }  
        
      }
      } else{
        res.status(401).send({
          'status' : 401,
          'error' :  'token not valid'
      });
      }
    }else {
      if(min_price && max_price) {
        var queryMinMax = await mart.selectCarByPriceRange(min_price, max_price);
        if (queryMinMax.rows.length>0){
          res.status(200).send({
            'status' : 200,
            'message':  `Cars with price range is between ${min_price} and ${max_price}` ,
            'data' :  queryMinMax.rows
        });
        }
        else{
          res.status(401).send({
            'status' : 401,
            'message':`No cars withprice range is between ${min_price} and ${max_price}.`,
           
        });
        }
       
    }
    else if (min_price) {
      var queryMin = await mart.selectCarByMinPrice(min_price);
      if (queryMin.rows.length>0){
        res.status(200).send({
          'status' : 200,
          'message':"cars with  sitted min price",
          'data' :  queryMin.rows
      });
      }
      else{
        res.status(401).send({
          'status' : 401,
          'message':`No carsfound`,
         
      });
      }
  }
  
  else if(max_price) {
      var queryMax = await mart.selectCarByMaxPrice(max_price);
      if (queryMax.rows.length>0){
        res.status(200).send({
          'status' : 200,
          'data' :  queryMax.rows
      });
      }
      else{
        res.status(401).send({
          'status' : 401,
          'message':`No carsfound`,
         
      });
      }
  }
  else if(body_type) {

    var queryMax = await mart.selectBy( 'cars','body_type',body_type);
    if (queryMax.rows.length>0){
      res.status(200).send({
        'status' : 200,
        'data' :  queryMax.rows
    });
    }
    else{
      res.status(401).send({
        'status' : 401,
        'message':`No carsfound for specified body type`,
       
    });
    }
}
else if(manufacturer) {
  var queryMax = await mart.selectBy('cars','manufacturer',manufacturer);
  if (queryMax.rows.length>0){
    res.status(200).send({
      'status' : 200,
      'data' :  queryMax.rows
  });
  }
  else{
    res.status(401).send({
      'status' : 401,
      'message':`No carsfound`,
     
  });
  }
  
}


    }

   

  };
//create a car ad endpoint 
const createAd = async (req, res)  => {
  const user = await mart.selectBy('users', 'email', req.auth.userName);
      
    if (user.rowCount!=0){
      const exist  = await mart.selectCount('cars', 'placNo', req.body.placNo);
      if (exist.rows[0].count === '0'){
        var car = new Car( user.rows[0].id, req.body.placNo,req.body.state || 'new',req.body.price, req.body.body_type,req.body.model,req.body.manufacturer);
        try {
            const insertedCar = await mart.addCar(car);
            return  res.status(201).json({
              status: 201,
              message:'Car post sucessfuly added',
              data: insertedCar.rows[0] 
             });
        } catch (error) {
          
            return res.status(401).send({ 'status': 401, 'message': 'Car is not saved' });
        }
      } else {
        return res.status(401).send({ 'status': 401, 'message': 'car with the same plac already exist' });
      }
   
 
    }
};

 
const getOneAd = async(req, res, next) =>{
 
    var id = req.params.id;
    const car = await mart.selectBy('cars', 'id', id);
   
    if (car.rowCount!=0){
      return res.status(200).json({
        status:200,
        data: car.rows[0],
      });
    }

    else{
      return res.status(401).json({
        status:401,
        error: 'call you want to car not found from one add get!'
      });
    }
};
  




 const updateAd= async(req, res, next) => {
   
  var id = req.params.id;
  var status = req.body.status;
  var price =req.body.price;
  const user = await mart.selectBy('users', 'email', req.auth.userName);
  let result
  if (req.body.price){
     result = await mart.updatePrice({'table':'cars','price': price, 'id': id, 'owner': user.rows[0].id});
  } else if (req.body.status){
     result = await mart.updateCarStatus({'status': status, 'id': id, 'owner': user.rows[0].id});
  }
  
  if (result.rowCount > 0) {
    return  res.status(200).json({
      status:200,
      data:result  
     });
      
  }
  else{
    return  res.status(400).json({
      status:400,
      error: 'filed to update car '
     });
      
  }
};
 
    
const deleteAd= async(req, res, next) => {

  var id = req.params.id;
 
  const user = await mart.selectBy('users', 'email', req.auth.userName);
 
  const car = await mart.selectBy('cars', 'id', id);

 if( car.rowCount > 0 && user.rowCount >0){
   if(req.auth.role || (user.row[0].id===car.row[0].owner)) {
   const  result = await mart.delete({'table':'cars', 'id': req.params.id});
    return  res.status(200).json({
      status:200,
      message: 'car deleted successfully',
      result:result
     });

   }
 else {
 
  return  res.status(401).json({
    status:401,
    message: 'access denied '
   });
  }
 } 
 else {
 
  return  res.status(401).json({
    status:401,
    message: 'no car  found  '
   });
  }

      
  }

export  {
  getAds,getOneAd,deleteAd,updateAd,createAd
}