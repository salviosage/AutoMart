const { Pool } = require('pg');
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.NODE_ENV);


class Database{
  
  dbConnection() {
    if (process.env.NODE_ENV==='test'){
     
     return new Pool({
      user: process.env.PGUSER,
      host:process.env.PGHOST,
      database:process.env.PGTESTDB,
      password:process.env.PGPASSWORD,
      port:process.env.PGPORT
  });
    }
    else if (process.env.NODE_ENV==='production') {
      return new Pool({
        user: 'ruzmchrydtigis',
        host:'ec2-107-22-238-217.compute-1.amazonaws.com',
        database:'d6mfbbjkbq1gkh',
        password:'ba585fea3cbd548c873a9fb23349acdbddcdfbdd8d64bd7721a6fd868e0428d0',
        port:'5432'
      });
    
    }
    else {
      return new Pool({
        user: process.env.PGUSER,
        host:process.env.PGHOST,
        database:process.env.PGDATABASE,
        password:process.env.PGPASSWORD,
        port:process.env.PGPORT
    });
    }
   
  }

  async selectById(table, id) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE id='${id}';`);
    await conn.end();
    return result;
  }
  
  async selectAll(table) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table};`);
    await conn.end();
    return result;
  }

  async selectBy(table, column, value) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE ${column}='${value}';`);
    await conn.end();
    return result;
  }

  async selectCarByBodyType(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE Body_type = ${value1} `);
    await conn.end();
    return result;
  }
  async selectCarByPriceRange(value1,value2) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1}  AND price <=  ${value2} `);
    await conn.end();
    return result;
  }


  async selectCarByMinPrice(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1};`);
    await conn.end();
    return result;
  }
  async selectCarByManufacturer(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE manufacturer = ${value1};`);
    await conn.end();
    return result;
  }

  async selectCarByMaxPrice(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price <= ${value1};`);
    await conn.end();
    return result;
  }

  async selectCount(table, column, value){
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    await conn.end();
    return result;
  }
  
  async addUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users (id,email,first_name,last_name,password,address,is_admin) VALUES(
        '${data.id}',
        '${data.email}',
        '${data.first_name}',
        '${data.last_name}',
        '${data.password}',
        '${data.address}',
        '${data.is_admin}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addCar(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO cars(id,placNo,owner,state,status,price,manufacturer,model,body_type,created_on) VALUES(
        '${data.id}',
        '${data.placNo}',
        '${data.owner}',
        '${data.state}',
        '${data.status}',
        '${data.price}',
        '${data.manufacturer}',
        '${data.model}',
        '${data.body_type}',
        '${data.created_on}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }
  
  async addOrder(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO orders(id,buyer,car_id,amount,status,created_on) VALUES(
        '${data.id}',
        '${data.buyer}',
        '${data.car_id}',
        '${data.amount}',
        '${data.status}',
        '${data.created_on}'
        
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addFlag(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO flags (id,user_id,car_id,reason,description,created_on) VALUES(
        '${data.id}',
        '${data.flager}',
        '${data.car_id}',
        '${data.reason}',
        '${data.description}',
        '${data.created_on}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async updatePrice(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE ${data.table} SET price = '${data.price}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }
  async updatePriceO(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE ${data.table} SET amount = '${data.price}' WHERE id = '${data.id}' AND buyer = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }
  async delete(data){
    const conn = this.dbConnection();
    const result = await conn.query(`DELETE FROM  ${data.table}  WHERE id = '${data.id}' `);
    await conn.end();
    return result;
  }
  
  async updatePassword(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE users SET password = '${data.password}' WHERE id = '${data.id}' returning *;`);
    await conn.end();
    return result;
  }


  async updateCarStatus(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE cars SET status = '${data.status}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }
  async updateOrderStatus(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE orders SET status = '${data.status}' WHERE id = '${data.id}'  returning *;`);
    await conn.end();
    return result;
  }
}

export default Database