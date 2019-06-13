import Joi from 'joi';

const orderPriceUpdateChema={

    amount: Joi.number().required()
}
export default orderPriceUpdateChema;