import Joi from 'joi';

const carDeleteSchema={
    
    id: Joi.string().alphanum().required()
    
}

export default carDeleteSchema;