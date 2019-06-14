import Joi from 'joi';

const carUpdateSchema={
    status: Joi.string(),
    price: Joi.number(),
    
}

export default carUpdateSchema;