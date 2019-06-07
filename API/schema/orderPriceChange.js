import Joi from 'joi';

const orderPriceUpdateChema={
    new_price_offered: Joi.number().required()
}
export default orderPriceUpdateChema;