import Joi from 'joi';

const resetPasswordSchema={
    email: Joi.string().email({minDomainAtoms : 2}).required()
}

export default resetPasswordSchema;