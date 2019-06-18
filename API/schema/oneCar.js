import Joi from 'joi';

const oneCarSchema={
    
    
    id: Joi.string().alphanum().required()
    
}

export default oneCarSchema;