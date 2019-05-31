const Joi = require('@hapi/joi');
const name=Joi.string().alphanum().min(3).max(30).required();
const password =Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const birthyear= Joi.number().integer().min(1900).max(2013);
const email=  Joi.string().email({ minDomainSegments: 2 })
module.export userSchema() = Joi.object().keys({
    fistname: name,
    lastname:name,
    location:name,
    email:email,
    password: password,
    access_token: [Joi.string(), Joi.number()],
    birthyear: birthyear,
    email:email
}).with('username', 'birthyear').without('password', 'access_token');

// Return result.
const result = Joi.validate({ username: 'abc', birthyear: 1994 }, signup);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
Joi.validate({ username: 'abc', birthyear: 1994 }, signup, function (err, value) { });  // err === null -> valid

import joi from 'joi';

const name = joi.string().regex(/^[A-Za-z]+$/).lowercase().required();
const email = joi.string().email({minDomainAtoms: 2 }).lowercase().required();

const userSchema = joi.object().keys({
    firstname: name,
    lastname: name,
    email: email,
    type: joi.string().valid(['client', 'staff']).required(),
});

const signinSchema = joi.object().keys({
    email: email,
    password: joi.string().min(8).required()
});


export default {
    userSchema
} 