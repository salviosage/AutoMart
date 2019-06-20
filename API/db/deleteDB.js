import { Pool } from 'pg';
import ENV from 'dotenv';
ENV.config();

class DeleteTalbe{
  constructor(){
    if (process.env.NODE_ENV==='test'){
     
      this.pool= new Pool({
       user: process.env.PGUSER,
       host:process.env.PGHOST,
       database:process.env.PGTESTDB,
       password:process.env.PGPASSWORD,
       port:process.env.PGPORT
   });
     }
     else if (process.env.NODE_ENV==='production') {
      this.pool= new Pool({
         user: 'ruzmchrydtigis',
         host:'ec2-107-22-238-217.compute-1.amazonaws.com',
         database:'d6mfbbjkbq1gkh',
         password:'ba585fea3cbd548c873a9fb23349acdbddcdfbdd8d64bd7721a6fd868e0428d0',
         port:'5432'
       });
     
     }
     else {
      this.pool = new Pool({
         user: process.env.PGUSER,
         host:process.env.PGHOST,
         database:process.env.PGDATABASE,
         password:process.env.PGPASSWORD,
         port:process.env.PGPORT
     });
     }


     this.pool.on('connect',()=> {
         console.log('connected...');
     })

     this.dropTables();
     
  }
  dropTables(){
    const dropTable = `
    DROP TABLE IF EXISTS flags CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS cars CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
   
    
  `;
  this.pool.query(dropTable)
  .then((res)=>{
  console.log('tables deleted successfully');
  })
  .catch((error)=>{
     console.log(error.message);
  });
  }


}

export default new DeleteTalbe();