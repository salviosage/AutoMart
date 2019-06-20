import Database from '../db/automrtdb';
import {Flag} from '../models/flag';
const mart = new Database();


 const getAllFlag= async (req, res) =>{
  if (req.auth.role!="admin"){
    return res.status(400).json({
      error: 'access denied'
    });
  }
  else{
    return res.status(200).json({
      status:200,
      data:flags
    });
  }
  
    
  }
const createFlag = async (req, res) => {

    const car = await mart.selectById('cars',req.body.car_id)
  
      if (car.rowCount == 0) return res.status(401).send({ 'status': 401, 'message': `Car  not found` });
      const user = await mart.selectBy('users', 'email', req.auth.userName);
      
    if (user.rowCount!=0){
      console.log(user.rows[0].id)
    var flag = new Flag( user.rows[0].id,req.body.car_id,req.body.reason,req.body.description || '');
    try {
      console.log(flag)
        const insertedFlag = await mart.addFlag(flag);
        return  res.status(201).json({
          status: 201,
          message:'order post sucessfuly added',
          data: insertedFlag.rows[0] 
         });
    } catch (error) {
      console.log(error);
        return res.status(401).send({ 'status': 401, 'message': 'flag is not saved' });
    }
  
  };
  
  }
 export {
   createFlag,getAllFlag
 }