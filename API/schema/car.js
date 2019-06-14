import Joi from 'joi';


const carSchema={
  
    manufacturer: Joi.string().regex(/^[a-zA-Z]{2,20}$/).required(),
    model: Joi.string().required(),
    body_type: Joi.string().required(),
    price: Joi.number().required(),
    state: Joi.string().regex(/^[a-zA-Z]{3,5}$/),
    status: Joi.string().regex(/^[a-zA-Z]{3,20}$/),
};

export default carSchema;