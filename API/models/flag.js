const uuid = require('uuid/v1');
import moment from 'moment';

class Flag {
    constructor(car_id,user_id, reason, description) {
        this.id = uuid();
        this.user_id = user_id;
        this.car_id = car_id;
        this.reason = reason;
        this.description = description;
        this.created_on=moment().format();
        
    }
}
module.exports.Flag = Flag;