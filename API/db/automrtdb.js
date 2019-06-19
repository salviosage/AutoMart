const { Pool } = require('pg');

class Database{
  
  dbConnection() {
    return new Pool({
        user: process.env.PGUSER,
        host:process.env.PGHOST,
        database:process.env.PGDATABASE,
        password:process.env.PGPASSWORD,
        port:process.env.PGPORT
    });
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
    const result = await conn.query(`INSERT INTO cars(id,owner,state,status,price,manufacturer,model,body_type,created_on) VALUES(
        '${data.id}',
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
        '${data.created_on}',
        
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