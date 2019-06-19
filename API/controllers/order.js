
import {Order} from '../models/order';
import Database from '../db/automrtdb';

const mart = new Database();

 const geAllOrder= async(req, res, next) =>{

    
        if (req.auth.isadmin) {
            var ordersResult = await mart.selectAll('orders');
            return res.status(200).send({ 
              'status': 200, 
              'data':ordersResult.rows });
        }
        var ordersResult = await mart.selectBy('orders', 'owner', req.auth.userName);
        return res.status(200).send({
            'status' : 200,
            'data' :  ordersResult.rows,
            'message': ordersResult.rowCount > 0 ? 'Available cars' : 'No orders available.'   
        });
    }

   
 
const createOrder = async(req, res, next) => {
  const car = await mart.selectById('cars',req.body.car_id)

    if (car.rowCount == 0) return res.status(401).send({ 'status': 401, 'message': `Car  not found` });
    
    const user = await mart.selectBy('users', 'email', req.auth.userName);
   
  if (car.rowCount!=0,user.rowCount!=0){
  var order = new Order(  user.rows[0].id,req.body.car_id,req.body.amount,req.body.status || 'pending');
  try {
      const insertedOrder = await mart.addOrder(car);
      return  res.status(201).json({
        status: 201,
        message:'order post sucessfuly added',
        data: insertedOrder.rows[0] 
       });
  } catch (error) {
      return res.status(401).send({ 'status': 401, 'message': 'order is not saved' });
  }

};

}

const updateOrderPrice = async(req, res, next) => {
    
   
   
  const order = await mart.selectBy('orders', 'id', req.params.id);

  if (order.rowCount === 0) return res.status(401).send({ 'status': 401, 'message': 'It looks like order you want to updaate is not found.'});
  
  const result = await mart.updatPrice({'table':'orders','price': req.body.price, 'id': req.params.id,});
  
  if (result.rowCount > 0) {
      return res.status(200).send({ 'status': 200, 'message': 'orders price was updated sucessfuly.', 'data': result.rows[0] });
  }
  else{
      return res.status(401).send({ 'status': 401, 'message': 'Update failed, you don\'t own this order.'});
  }
}


const updateOrderStatus = async(req, res, next) => {

  const order = await mart.selectBy('orders', 'id', req.params.id);

  if (order.rowCount === 0) return res.status(401).send({ 'status': 401, 'message': 'It looks like order you want to updaate is not found.'});
  
  const result = await mart.updateOrderstatus({'status': req.body.price, 'id': req.params.id});
  
  if (result.rowCount > 0) {
      return res.status(200).send({ 'status': 200, 'message': 'orders price was updated sucessfuly.', 'data': result.rows[0] });
  }
  else{
      return res.status(401).send({ 'status': 401, 'message': 'Update failed, you don\'t own this order.'});
  }
}
 
    
export {
  createOrder,updateOrderPrice,updateOrderStatus,geAllOrder
}
