# AutoMart
[![Build Status](https://travis-ci.org/salviosage/AutoMart.svg?branch=develop)](https://travis-ci.org/salviosage/AutoMart)
[![Coverage Status](https://coveralls.io/repos/github/salviosage/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/salviosage/AutoMart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e865b2b3ba918cf0bcaa/maintainability)](https://codeclimate.com/github/salviosage/AutoMart/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.


------------------------------------------------------------------------------

## UI

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI 
[AutoMart/UI link](https://salviosage.github.io/AutoMart/UI/pages/welcome.html)

---------------------------------------------------------------------

## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup| POST | User can signup by provide fidrst name, last name , email, password,isadmin and adress  |
| /api/v1/auth/login | POST | User can login by send request with username and password|
| /api/v1/car | POST | logged in user can post a car ad |
| /api/v1/order | POST | Logeed in user can make an order to available car ads |
| /api/v1/cars/:id/ | PATCH | loged in user can  update the price of his/her posted car sale ad |
| /api/v1/order/:id | PATCH | logged in user can update the price or his/her purchase order |
| /api/v1/car/:id | PATCH | logged in user can mark his/her posted AD as sold  |
| /api/v1/car/:id | GET | Any  user can  view a specific car |
| /api/v1/cars/`any qwery specifically for car parameters`| GET |user can view all car specifically for queries provided |
| /api/v1/cars/ | GET |  Aamin can  view all posted ads whether sold or unsold |
| /api/v1/car/:id | DELETE |  admin can  delete a posted AD record |

## Used Tools

### Language
```
Javascript
```
### Server Environment
```
 NodeJS (JavaScript runtime built on Chrome's V8 JavaScript engine)
 ```
### Framework
```
 Express (minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.)
 ```
### Testing Framework and assertion library
```
 Mocha and Chai
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link 

[AutoMart heroku link](https://utomartsalvi.herokuapp.com)

### Swagger link 

[AutoMart Docs k](https://utomartsalvi.herokuapp.com/automart/#)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository ```https://github.com/salviosage/AutoMart``` or download the zip file and once this is set up you are going to need [node js ](https://nodejs.org/en/)



## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into AutoMart folder using your terminal and run the following commang 

```
> npm install  
```

It will to install all required package locally .

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


## Author

-[Jean Salvi ](https://www.linkedin.com/in/jean-salvi-d-78aa9016b/)

---

## License & copyright
Copyright (c) Jean Salvi ,lifelong learner |data science enthusiast
