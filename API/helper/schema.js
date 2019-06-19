const Joi = require('joi');



// accepts name only as letters and converts to uppercase
const name = Joi.string().regex(/^[A-Z]+$/).uppercase();

const email= Joi.string().email({minDomainAtoms : 2});
const  option = Joi.bool().valid([1,0]).required();
const amount = Joi.number().positive().greater(1).precision(2);
const userID = Joi.string().guid({version: 'uuidv4'});
const password = Joi.string().min(7).required().strict();



 const newUserDataSchema = Joi.object().keys({
    email:email.required(),
    first_name: name.required(),
    last_name: name.required(),
    address:name.required(),
    password: password,
    confirmPassword: password.valid(Joi.ref('password')).required().strict(),
    is_admin: option.required(),
});

const newCarDataSchema = Joi.object().keys({
    manufacturer: name.required(),
    model: name.required(),
    body_type: name.required(),
    price: amount.required(),
    state: name.valid('new', 'used').required(),
    status: name.valid('available', 'sold').required(),
});


 const oneCarDataSchema = Joi.object().keys({
    id:userID.required(),
});

 const deleteCarDataSchema = Joi.object().keys({
    id:userID.required(),
});

 const loginDataSchema =Joi.object().keys({
    email:email.required(),
    password: password.required(),
});

 const passwordResetDataSchema = Joi.object().keys({
    email:email.required(),
});

 const newOrderDataSchema =Joi.object().keys({
    carID:userID.required(),
    userID:userID.required(),
    amount: amount.required(),
});

 const newFlagDataSchema =Joi.object().keys({
    carID:userID,
    userID:userID,
    reason: name.valid('price wired ', 'wrong information', 'others').required(),
    description: name
});

 const carPriceUpdateDataSchema= Joi.object().keys({
    carID:userID,
    userID:userID,
    price: amount.required(), 
});
 const carStatusUpdateDataSchema =Joi.object().keys({
    carID:userID,
    userID:userID,
    status: name.valid('available ', 'sold',).required(), 
});

 const orderPriceUpdateDataSchema =Joi.object().keys({
    orderID:userID,
    userID:userID,
    price: amount.required(), 
});
 const orderStatusUpdateDataSchema =Joi.object().keys({
    orderID:userID,
    userID:userID,
    status: name.valid('accepted', 'pending', 'rejected').required(), 
});


module.exports = {
    '/order/':newOrderDataSchema,
    '/order/:id/status':orderStatusUpdateDataSchema,
    '/order/:id/price':orderPriceUpdateDataSchema,
    '/flg/':newFlagDataSchema,
    '/auth/signup':newUserDataSchema, 
    '/auth/login':loginDataSchema,
    '/auth/reset':passwordResetDataSchema,
    '/car/':newCarDataSchema,
    '/car/:id':oneCarDataSchema,
    '/car/:id/status':carStatusUpdateDataSchema,
    '/car/:id/price':carPriceUpdateDataSchema
    
};