const uuid = require('uuid/v1');

class Order {
    constructor(buyer, car_id, amount, status) {
        this.id = uuid();
        this.buyer = buyer;
        this.car_id = car_id;
        this.amount = amount;
        this.status = status;
      
    }
}

module.exports.Order = Order;