import { Pool } from 'pg';
import ENV from 'dotenv';
ENV.config();

class Setup{
    constructor(){
       this.pool = new Pool({
           user: process.env.PGUSER,
           host:process.env.PGHOST,
           database:process.env.PGTESTDB,
           password:process.env.PGPASSWORD,
           port:process.env.PGPORT
       });

       this.pool.on('connect',()=> {
           console.log('connected...');
       })

       this.createTables();
       
    }

    createTables(){

        const cars = `
        CREATE TABLE IF NOT EXISTS cars(
            id UUID PRIMARY KEY,
            owner UUID NOT NULL,
            created_on TIMESTAMP,
            state VARCHAR(5) NOT NULL,
            status VARCHAR(20) NOT NULL,
            price INT NOT NULL,
            manufacturer VARCHAR(20) NOT NULL,
            model VARCHAR(20) NOT NULL,
            body_type VARCHAR(20) NOT NULL,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
          )`;
        
        this.pool.query(cars)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

        const users = `
        CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            is_admin BOOLEAN NOT NULL
        )`;

        this.pool.query(users)
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error.message);
        })

        const orders = `
        CREATE TABLE IF NOT EXISTS orders(
            id UUID PRIMARY KEY,
            buyer UUID NOT NULL,
            car_id UUID NOT NULL,
            created_on TIMESTAMP,
            amount INT NOT NULL,
            status VARCHAR(20) NOT NULL,
            FOREIGN KEY (buyer) REFERENCES users(id) ON DELETE CASCADE
          )`;
         

        this.pool.query(orders)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

        
       

        const flags = `
        CREATE TABLE IF NOT EXISTS flags(
            id UUID PRIMARY KEY,
            car_id UUID NOT NULL,
            user_id UUID NOT NULL,
            created_on TIMESTAMP,
            reason VARCHAR(20) NOT NULL,
            description VARCHAR(100) ,
            FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
          )`;
          

        this.pool.query(flags)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }
}

export default new Setup();