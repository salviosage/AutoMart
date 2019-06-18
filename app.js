import "@babel/polyfill";
const express=require('express');
const bodyParser =require('body-parser');
const path=require('path');
const carRoutes= require('./API/routes/car');
const userRoutes = require('./API/routes/user');
const orderRoutes= require('./API/routes/order');
const flagRoutes = require('./API/routes/flag');
import swaggerUi from 'swagger-ui-express';
const  swaggerDoc  = require('./swagger.json');
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();




  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 app.use(cors());
 app.use(bodyParser.json());
 app.use('/automart', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
 app.use('/images', express.static(path.join(__dirname, 'images')));

const api_version = process.env.api_version;

const base_url = '/api/'+ api_version;
app.use(base_url +'/auth',userRoutes);
app.use(base_url +'/car', carRoutes);
app.use(base_url +'/order', orderRoutes);
app.use(base_url +'/flag',flagRoutes);
module.exports=app; 