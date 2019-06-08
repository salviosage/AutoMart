const express=require('express');
const bodyParser =require('body-parser');
const path=require('path');
const carRoutes= require('./API/routes/car');
const userRoutes = require('./API/routes/user');
const orderRoutes= require('./API/routes/order');
const flagRoutes = require('./API/routes/flag');
const app = express();


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 app.use(bodyParser.json());
 app.use('/images', express.static(path.join(__dirname, 'images')));

const api_version = 'v1';

const base_url = '/api/'+ api_version;

app.use(base_url +'/car', carRoutes);
app.use(base_url +'/auth',userRoutes);
app.use(base_url +'/order', orderRoutes);
app.use(base_url +'/flag',flagRoutes);
module.exports=app; 