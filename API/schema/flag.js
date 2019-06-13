import Joi from 'joi';


const flagSchema={
    contact:Joi.string().email({minDomainAtoms : 2}).required(),
    car_id : Joi.string().required(),
    reason: Joi.string().required(),
    description: Joi.string()

};

export default flagSchema;