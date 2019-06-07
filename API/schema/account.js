import Joi from 'joi';

const accountSchema={
    email: Joi.string().email({minDomainAtoms : 2}).required(),
    first_name: Joi.string().regex(/^[a-zA-Z]{2,20}$/).required(),
    last_name: Joi.string().regex(/^[a-zA-Z]{2,20}$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    address: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
    is_admin: Joi.bool().valid([1,0]).required()
   
};

export default accountSchema;