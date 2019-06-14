import Joi from 'joi';


const flagSchema={
   
    car_id : Joi.string().required(),
    reason: Joi.string().required(),
    description: Joi.string()

};

export default flagSchema;