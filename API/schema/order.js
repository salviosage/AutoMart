import Joi from 'joi';

const purchoseOrderSchema={
    car_id: Joi.string().required(),
    amount: Joi.number().required(),
    
}

export default purchoseOrderSchema;