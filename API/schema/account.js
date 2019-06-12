import Joi from 'joi';

const accountSchema={
    email: Joi.string().email({minDomainAtoms : 2}).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    is_admin: Joi.bool().valid([1,0]).required()
   
};

export default accountSchema;