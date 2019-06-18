import "@babel/polyfill";
const express=require('express');
const bodyParser =require('body-parser');
const path=require('path');
const automartRoute = require('./API/routes/automartRoute');
import swaggerUi from 'swagger-ui-express';
const  swaggerDoc  = require('./swagger.json');
import cors from 'cors';
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

const api_version = 'v1';


const base_url = '/api/'+ api_version;
app.use(base_url ,automartRoute);

module.exports=app; 