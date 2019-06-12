import Joi from 'joi';

const orderStatusUpdateChema={

    contact:  Joi.string().email({minDomainAtoms : 2}).required(),
    status: Joi.string().required()
}
export default orderStatusUpdateChema;