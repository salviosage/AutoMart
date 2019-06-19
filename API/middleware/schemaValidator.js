/* middlewares/SchemaValidator.js */

const _ = require('lodash');
const Joi = require('joi');
const Schemas = require('../helper/schema');

module.exports = (useJoiError,routing) => {
   
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

   
    const supportedMethods = ['post', 'put','patch','delete'];
    

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req, res, next) => {
      

        const route = '/'+routing+ req.route.path;
        const method = req.method.toLowerCase();
        

        if (supportedMethods.includes(method) && _.has(Schemas, route)) {
         

            // get schema for the current route
            const _schema = _.get(Schemas, route);
            
            if (_schema) {

                // Validate req.body using the schema and validation options
                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {

                    if (err) {

                      
                        // Send back the JSON error response
                        
                        res.status(422).json({
                            status:422,
                            error:  _.map(err.details, ({message}) => ({
                                message: message.replace(/['"]/g, ''),
                                
                            }))
                          });

                    } else {
                        req.body = data;
                        next();
                    }

                });

            }
        }

        next();
    };
};