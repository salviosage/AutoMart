import Joi from 'joi';

const carPriceUpdateSchema={
    new_price: Joi.number().required()
}

export default carPriceUpdateSchema;