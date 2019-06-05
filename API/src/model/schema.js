const Joi = require('@hapi/joi');

const name=Joi.string().alphanum().min(3).max(30).required();
const password =Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const number= Joi.number().integer().min(1900).max(2013);
const email=  Joi.string().email({ minDomainSegments: 2 })
const string=joi.string();

const  userSchema = Joi.object().keys({
    fistname: name,
    lastname:name,
    location:name,
    email:email,
    type: string.valid(['admin', 'user']).required(),
    password: password,
    access_token: [Joi.string(), Joi.number()],
    email:email
});

const signinSchema = joi.object().keys({
    email: email,
    password: joi.string().min(8).required()
});
 const adsSchema=joi.object().keys({
    owner : number.required(), // user id
    state :string.valid(['new', 'used']).required(), // new,used
    status :string.valid(['sold', 'available']).required(), 
    price : number.required(),
    manufacturer : joi.string().required(),
    model : string.required(),
    body_type : sting.required(),
 }

 );
 const flagSchema=joi.object().keys({

    id : number,
    car_id: number,
    reason : string, // [pricing, weird demands, etc]
    description : String,
    id :number,
    // user id
    state :string.valid(['new', 'used']).required(), // new,used
    status :string.valid(['sold', 'available']).required(), 
    price : number.required(),
    manufacturer : joi.string().required(),
    model : string.required(),
    body_type : string.required(),
 }

 );
 const orderChema = joi.object().keys({
    
        id : number,
        car_id: number,
        owner : number.required(),  // user id
        amount : number, // price offered
        
 })


export default {
    userSchema,signinSchema,adsSchema,orderChema,flagSchema
} 