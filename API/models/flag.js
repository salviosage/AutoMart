const uuid = require('uuid/v1');

class Flag {
    constructor(car_id,user_id, reason, description) {
        this.id = uuid();
        this.user_id = user_id;
        this.car_id = car_id;
        this.reason = reason;
        this.description = description;
        
    }
}
module.exports.Flag = Flag;