import Joi from 'joi';

const loginSchema={
    email: Joi.string().email({minDomainAtoms : 2}).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
};

export default loginSchema;