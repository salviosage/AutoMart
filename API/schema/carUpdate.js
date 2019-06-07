import Joi from 'joi';

const carUpdateSchema={
    status: Joi.string().regex(/^[a-zA-Z]{3,20}$/),
    price: Joi.number(),
    id: Joi.string().required()
    
}

export default carUpdateSchema;