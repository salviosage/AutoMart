import Joi from 'joi';


const flagSchema={
    buyer:Joi.string().email({minDomainAtoms : 2}).required(),
    car_id : Joi.number().required(),
    reason: Joi.string().required(),
    description: Joi.string()

};

export default flagSchema;