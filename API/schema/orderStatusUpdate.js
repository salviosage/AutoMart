import Joi from 'joi';

const orderStatusUpdateChema={

   
    status: Joi.string().required()
}
export default orderStatusUpdateChema;