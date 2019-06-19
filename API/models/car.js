const uuid = require('uuid/v1');
import moment from 'moment';

class Car {
    constructor(owner, state, price,model, body_type,manufacturer) {
        this.id = uuid();
        this.owner = owner;
        this.state = state;
        this.status = 'available';
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
        this.body_type = body_type;
        this.created_on=moment().format();;
        
    }
}

module.exports.Car = Car;