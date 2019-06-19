
import  Database from '../db/automrtdb';
import {Car} from '../models/car';
const mart = new Database();


const getAds = async (req, res) => {
    var min_price = req.query.min;
    var max_price = req.query.max;
    
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
    else {
        const token = req.auth
        if (token) {
            if (token.isadmin) {
                var carsResult = await mart.selectAll('cars');
                return res.status(200).send({ 
                  'status': 200, 
                  'data': carsResult.rows })
            };
        }
        // Get all cars whose status is available
        var carsResult = await mart.selectBy('cars', 'status', 'available');
        return res.status(200).send({
            'status' : 200,
            'data' :  carsResult.rows,
            'message': carsResult.rowCount > 0 ? 'Available cars' : 'No cars available.'   
        });
    }
};
//create a car ad endpoint 
const createAd = async (req, res)  => {
  const user = await mart.selectBy('users', 'email', req.auth.userName);
      
    if (user.rowCount!=0){
   
  var car = new Car( user.rows[0].id,req.body.state || 'new',req.body.price, req.body.body_type,req.body.model,req.body.manufacturer);
  try {
      const insertedCar = await mart.addCar(car);
      return  res.status(201).json({
        status: 201,
        message:'Car post sucessfuly added',
        data: insertedCar.rows[0] 
       });
  } catch (error) {
    console.log(error)
      return res.status(401).send({ 'status': 401, 'message': 'Car is not saved' });
  }
    }
};

 
const getOneAd = async(req, res, next) =>{
 
    var id = req.params.id;
    const car = await mart.selectBy('cars', 'id', id);
   
    if (car.rowCount!=0){
      return res.status(200).json({
        status200,
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
      data:car
     });
      
  }
  else{
    return  res.status(400).json({
      status:400,
      error: 'filed to update car '
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
export  {
  getAds,getOneAd,deleteAd,updateAd,createAd
}