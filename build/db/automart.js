"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flags = exports.cars = exports.orders = exports.users = void 0;
var users = [{
  "id": "ffdfzfzef5f5zef54e",
  "email": "salviosage@gmail.com",
  "first_name": "jean salvi",
  "last_name": "duk",
  "password": "121621454655",
  "address": "kigali",
  "is_admin": "true"
}, {
  "id": "ffdfzfzef5f5zef54efdfd",
  "email": "jeasal@gmail.com",
  "first_name": "jean salvi",
  "last_name": "duk",
  "password": "1216214546155",
  "address": "kigali",
  "is_admin": "false"
}];
exports.users = users;
var orders = [{
  "id": "91af9944-e3de-47b3-9ece-cbda9ee32699",
  "buyer": "salviosage@gmail.com",
  "car_id": "ffdfzfzef5f5zef54e",
  "amount": "11515555",
  "status": "pending",
  "created_on": 1559808005114,
  "modified_on": 1559808005114
}, {
  "id": "91af9944-e3de-47b3-9ece-cbda9e",
  "buyer": "norml@gmail.com",
  "car_id": "ffdfzfzef5f5zef54e",
  "amount": "11515555",
  "status": "pending",
  "created_on": 1559808005114,
  "modified_on": 1559808005114
}];
exports.orders = orders;
var cars = [{
  "id": "ffdfzfzef5f5zef54e",
  "owner": "5545455dqsdq4ds",
  "state": "used",
  "status": "available",
  "body_type": "truc",
  "model": "benz",
  "manufacturer": "mercedes",
  "price": "1215144",
  "created_on": "12/12/2018",
  "modified_on": "112/12/2018"
}, {
  "id": "ffdfzfzef5f5zef5d5",
  "owner": "5545455dqsdq4ds",
  "state": "new",
  "status": "available",
  "body_type": "truc",
  "model": "benz",
  "manufacturer": "mercedes",
  "price": "1215144",
  "created_on": "12/12/2018",
  "modified_on": "112/12/2018"
}, {
  "id": "ffdfzfzef5f5zef54er",
  "owner": "5545455dqsdq4ds",
  "state": "new",
  "status": "available",
  "body_type": "truc",
  "model": "benz",
  "manufacturer": "mercedes",
  "price": "1215144",
  "created_on": "12/12/2018",
  "modified_on": "112/12/2018"
}];
exports.cars = cars;
var flags = [{
  "id": "e1065f86-88cf-4a3b-95cb-47c2e4105880",
  "car_id": "ffdfzfzef5f5zef54e",
  "reason": "pricing ",
  "discription": "pricing is wired man can you see that",
  "created_on": 1559815177122
}];
exports.flags = flags;