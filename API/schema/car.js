import Joi from 'joi';


const carSchema={
    reporter_Tel: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
    saleID: Joi.number().required(),
    reason: Joi.string().required(),
    description: Joi.string().required()
};

export default carSchema;