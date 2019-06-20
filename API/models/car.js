const uuid = require('uuid/v1');
import moment from 'moment';

class Car {
    constructor(owner,placNo, state, price,model, body_type,manufacturer) {
        this.id = uuid();
        this.owner = owner;
        this.placNo=placNo;
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