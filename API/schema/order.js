import Joi from 'joi';

const purchoseOrderSchema={
    car_ID: Joi.number().required(),
    buyer_contacts: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
    price: Joi.number().required(),
    price_offered: Joi.number().required()
}

export default purchoseOrderSchema;