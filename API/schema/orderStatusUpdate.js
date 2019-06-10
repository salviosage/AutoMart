import Joi from 'joi';

const orderStatusUpdateChema={

    contacts:  Joi.string().email({minDomainAtoms : 2}).required(),
    status: Joi.string().required()
}
export default orderStatusUpdateChema;