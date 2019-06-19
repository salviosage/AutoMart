const uuid = require('uuid/v1');
import moment from 'moment';

class Order {
    constructor(buyer, car_id, amount, status) {
        this.id = uuid();
        this.buyer = buyer;
        this.car_id = car_id;
        this.amount = amount;
        this.status = status;
        this.created_on=moment().format();
      
    }
}

module.exports.Order = Order;