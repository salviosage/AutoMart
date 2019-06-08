import Joi from 'joi';

const carDeleteSchema={
    
    id: Joi.string().required()
    
}

export default carDeleteSchema;