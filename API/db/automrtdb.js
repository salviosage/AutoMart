const { Pool } = require('pg');

class Database{
  
  dbConnection() {
    return new Pool({
        user: process.env.PGUSER,
        host:process.env.PGHOST,
        database:process.env.PGTESTDB,
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

  async selectCarByPriceRange(value1, value2) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1} AND price <= ${value2};`);
    await conn.end();
    return result;
  }

  async selectCarByMinPrice(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1};`);
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

  async createDb(){
    const conn = this.dbConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users( Id VARCHAR(255) PRIMARY KEY, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, Email VARCHAR(50) UNIQUE NOT NULL, Password VARCHAR(255) NOT NULL, Address VARCHAR(50) NOT NULL, IsAdmin BOOLEAN NOT NULL DEFAULT false);

      CREATE TABLE IF NOT EXISTS cars ( Id VARCHAR(255) PRIMARY KEY, Owner VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE, Create_on TIMESTAMP NOT NULL DEFAULT NOW(), State VARCHAR(30) NOT NULL, Status VARCHAR(30) NOT NULL, Price FLOAT NOT NULL, Manufacturer VARCHAR(30) NOT NULL, Model VARCHAR(30) NOT NULL, Body_type VARCHAR(30) NOT NULL );

      CREATE TABLE IF NOT EXISTS orders ( Id VARCHAR(255) PRIMARY KEY, Buyer VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE, Car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE, Amount INTEGER NOT NULL, Status VARCHAR(30) NOT NULL );

      CREATE TABLE IF NOT EXISTS flags ( Id VARCHAR(255) PRIMARY KEY, Car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE, Create_on DATE NOT NULL, Description VARCHAR(30) NOT NULL );
    `);
    await conn.end();
    return;
  }

  async addUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users VALUES(
        '${data.id}',
        '${data.first_name}',
        '${data.last_name}',
        '${data.email}',
        '${data.password}',
        '${data.address}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addCar(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO cars(id,owner,state,status,price,manufacturer,model,body_type) VALUES(
        '${data.id}',
        '${data.owner}',
        '${data.state}',
        '${data.status}',
        '${data.price}',
        '${data.manufacturer}',
        '${data.model}',
        '${data.body_type}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async updateCarPrice(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE cars SET price = '${data.price}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }

  async updateCarStatus(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE cars SET status = '${data.status}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }
}

module.exports.Database = Database;