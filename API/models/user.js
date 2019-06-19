const uuid = require('uuid/v1');

class User{
    constructor(email, first_name, last_name, password, address, is_admin) {
        this.id = uuid();
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.address = address;
        this.is_admin = is_admin;
    }
}

module.exports.User = User;