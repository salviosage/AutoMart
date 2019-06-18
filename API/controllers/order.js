
import moment from 'moment';
import uuid from 'uuid';
import {cars} from "../db/automart";
import {orders} from "../db/automart";




const geAllOrder= (req, res, next) =>{
  if (req.auth.role!="admin"){
    return res.status(400).json({
      status:400,
      error: 'call you want to order not found!'
    });
  }
  else{
    return res.status(200).json({
      status:200,
      data:orders
    });
  }
  
    
  }
   
 
const createOrder = (req, res, next) => {

    const car= cars.find(car=> car.id === req.body.car_id  )
    
        if (!car || car.status !="available") {
          return res.status(400).json({
            status:400,
            error: 'call you want to order not found!'
          });
        }
      
  const newOrder
   = {
    id: uuid.v4(),
    contact : req.auth.userName, 
    car_id : req.body.car_id,
    amount : req.body.amount, 
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

const updateOrderPrice = (req, res, next) => {
    
   
   

    const order= orders.find(order=> order.id === req.params.id )

    
        if (!order || order.status !="pending" || order.contact !=req.auth.userName) {
          return res.status(401).json({
            status:401,
            error: 'invalid request!'
          });
        }
        
       
       

        const index = orders.indexOf(order);
        
  
    orders[index].id= order.id,
    orders[index].buyer =order.buyer, 
    orders[index].car_id = order.car_id,
    orders[index].amount =  orders.amount ||req.body.amount, 
    orders[index].status= order.satus   
    orders[index].created_on= order.created_on,
    orders[index].modified_on= moment.now()
    
 
         return  res.status(200).json({
           status:200,
            data:order
          });
           
  
};
const updateOrderStatus = (req, res, next) => {

 

  const order= orders.find(order=> order.id === req.params.id )
  
      if (!order || order.status !="pending") {
        return res.status(401).json({
          status:401,
          error: ('order you want to edit not found!')
        });
      }

      
     const car =cars.find(car => car.id===order.car_id)
     
     if (!car || car.owner!=req.auth.userName){
      return res.status(401).json({
        status:401,
        error: ('invalid request !')
      });
     }
    

   

      const index = orders.indexOf(order); 
      

  orders[index].id= order.id,
  orders[index].buyer =order.buyer, 
  orders[index].car_id = order.car_id,
  orders[index].amount =  orders.amaout  
  orders[index].status= order.satus   || req.body.status,
  orders[index].created_on= order.created_on,
  orders[index].modified_on= moment.now()


       return  res.status(200).json({
          status:200,
          data:order
        });
         

};


export default {
  geAllOrder,createOrder,updateOrderPrice,updateOrderStatus

}

