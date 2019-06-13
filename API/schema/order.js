import Joi from 'joi';

const purchoseOrderSchema={
    car_id: Joi.string().required(),
    contact:Joi.string().email({minDomainAtoms : 2}).required(),
    amount: Joi.number().required(),
    
}

export default purchoseOrderSchema;