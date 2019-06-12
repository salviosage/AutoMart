import Joi from 'joi';

const purchoseOrderSchema={
    car_id: Joi.number().required(),
    contacts:Joi.string().email({minDomainAtoms : 2}).required(),
    amount: Joi.number().required(),
    
}

export default purchoseOrderSchema;