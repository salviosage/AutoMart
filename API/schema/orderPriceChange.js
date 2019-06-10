import Joi from 'joi';

const orderPriceUpdateChema={

    contacts:  Joi.string().email({minDomainAtoms : 2}).required(),
    amount: Joi.number().required()
}
export default orderPriceUpdateChema;