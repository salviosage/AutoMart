
const Joi = require('joi');

// accepts name only as letters and converts to uppercase
const name = Joi.string().regex(/^[A-Z]+$/).uppercase();

const email= Joi.string().email({minDomainAtoms : 2});
const  option = Joi.bool().valid([1,0]).required();
const amount = Joi.number().positive().greater(1).precision(2);
const personID = Joi.string().guid({version: 'uuidv4'});
const password = Joi.string().min(7).required().strict();



const newUserDataSchema = Joi.object().keys({
    email:email.required(),
    firstname: name.required(),
    lastname: name.required(),
    location:name.required(),
    password: password,
    confirmPassword: password.valid(Joi.ref('password')).required().strict(),
    is_admin: option.required(),
});

const newCarDataSchema = Joi.object().keys({
    manufacturer: name.required(),
    model: name.required(),
    body_type: name.required(),
    price: amount.required(),
    state: name.valid('new ', 'used').required(),
    status: name.valid('available ', 'sold').required(),
});


const oneCarDataSchema = Joi.object().keys({
    id:userID.required(),
});

const deleteCarDataSchema = Joi.object().keys({
    id:userID.required(),
});

const loginDataSchema = Joi.object().keys({
    email:email.required(),
    password: password.required(),
});

const passwordResetDataSchema = Joi.object().keys({
    email:email.required(),
});

const newOrderDataSchema = Joi.object().keys({
    carID:personID.required(),
    userID:personID.required(),
    amount: amount.required(),
});

const newFlagDataSchema = Joi.object().keys({
    carID:personID,
    userID:personID,
    reason: name.valid('price wired ', 'wrong information', 'others').required(),
    description: name
});

const carPriceUpdateDataSchema = Joi.object().keys({
    carID:personID,
    userID:personID,
    price: amount.required(), 
});
const carStatusUpdateDataSchema = Joi.object().keys({
    carID:personID,
    userID:personID,
    status: name.valid('available ', 'sold',).required(), 
});
const orderPriceUpdateDataSchema = Joi.object().keys({
    orderID:personID,
    userID:personID,
    price: amount.required(), 
});
const orderStatusUpdateDataSchema = Joi.object().keys({
    orderID:personID,
    userID:personID,
    status: name.valid('accepted', 'pending', 'rejected').required(), 
});



// export the schemas
module.exports = {
    'car/': newCarDataSchema,
    'car/:id/status': carStatusUpdateDataSchema,
    'car/:id/price': carPriceUpdateDataSchema,
    'car/:id/delete': deleteCarDataSchema,
    'car/:id': oneCarDataSchema,
    'order/': newOrderDataSchema,
    'order/:id/status': orderStatusUpdateDataSchema,
    'order/:id/price': orderPriceUpdateDataSchema,
    'flag/': newFlagDataSchema,
    'user/auth/signup': newUserDataSchema,
    'user/auth/login': loginDataSchema,
    'user/auth/reset': passwordResetDataSchema,
   
};

