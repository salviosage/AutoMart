import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 import jwt from 'jsonwebtoken';
import env from "dotenv"; 
env.config()

 let newUser ="token";
 

 chai.should();
  let userToken,adminToken,ownerToken,anyToken="";
 chai.use(chaiHttp);

describe('users ', ()=>{
    before((done)=>{
		const adminInfo = {
            email: "Dukuzwe@gmail.com",
            first_name: "Dukuzwenimana",
            last_name: "salvi",
            password: "Dukuzwe@15151",
            confirmPassword :"Dukuzwe@15151",
            address: "kigali",
            is_admin: 1
        }
     
        const ownerInfo = {
		   email: "clet@gmail.com",
           first_name: "mwunguzi",
           last_name: "lucky",
           password: "Clet@15151",
           confirmPassword :"Clet@15151",
           address: "kigali",
           is_admin: 0
        }
        const userInfo = {
			email: "lucky@gmail.com",
           first_name: "jhon",
           last_name: "lucky",
           password: "Lucky@15151",
           confirmPassword :"Lucky@15151",
           address: "kigali",
           is_admin: 0
        }
        adminToken =jwt.sign({ userName:adminInfo.email,role:adminInfo.is_admin },"RANDOM_TOKEN_SECRET",{ expiresIn: '24h' });
        console.log(adminToken);
        userToken =jwt.sign({ userName:userInfo.email,role:userInfo.is_admin },"RANDOM_TOKEN_SECRET",{ expiresIn: '24h' });
        console.log(userToken);
        ownerToken =jwt.sign({ userName:ownerInfo.email,role:ownerInfo.is_admin },"RANDOM_TOKEN_SECRET",{ expiresIn: '24h' });
        console.log(userToken);
		chai.request(app)
		.post('/api/v1/auth/signup')
		.send(adminInfo)
		.end((err, res)=>{
            
			 adminToken = res.body.token;
			
        })

    chai.request(app)
    .post('/api/v1/auth/signup')
    .send(ownerInfo)
    .end((err, res)=>{
        
         ownerToken = res.body.token;
       
        
    })
       
    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userInfo)
        .end((err, res)=>{
            
            userToken = res.body.token;
            
            done();
        })
	
    })
  
   describe("test users ",()=> { 
    

       it('it should login a user return token  ', (done)=>{
        const record = {
           email: "Dukuzwe@gmail.com",
           password: "Dukuzwe@15151",
         }
           chai.request(app)
               .post('/api/v1/auth/login')
               .send(record)
               .end((err, res)=>{
                   console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(200);
                  res.body.should.have.property('token');
                  done();
              })
       });

       it('it should  not create a user and whose email exist  ', (done)=>{
        const record = {
           email: "clet@gmail.com",
           first_name: "mwunguzi",
           last_name: "Dukuzwenimana",
           confirmPassword :"Dukuzwe@15151",
           password: "Dukuzwe@15151",
           address: "kigali",
           is_admin: 1
         }
   
           chai.request(app)
               .post('/api/v1/auth/signup')
               .send(record)
               
               .end((err, res)=>{
                console.log(res.body);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(404);
                  res.body.should.have.property('error');

                  done();
               
              })
   
       });
       it('it should   create a user   ', (done)=>{
        const record = {
           email: "irene@gmail.com",
           first_name: "mwunguzi",
           last_name: "Dukuzwenimana",
           confirmPassword :"Dukuzwe@15151",
           password: "Dukuzwe@15151",
           address: "kigali",
           is_admin: 1
         }
   
           chai.request(app)
               .post('/api/v1/auth/signup')
               .send(record)
               
               .end((err, res)=>{
                console.log(res.body);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(201);
                  res.body.should.have.property('token');

                  done();
               
              })
   
       });
       it('it should   create a user  who is not dmin  ', (done)=>{
        const record = {
           email: "shyaka@gmail.com",
           first_name: "shaka",
           last_name: "Dukuzwenimana",
           confirmPassword :"Dukuzwe@15151",
           password: "Dukuzwe@15151",
           address: "kigali",
           is_admin:0
         }
   
           chai.request(app)
               .post('/api/v1/auth/signup')
               .send(record)
               
               .end((err, res)=>{
                console.log(res.body);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(201);
                  res.body.should.have.property('token');

                  done();
               
              })
   
       });
       it('it should not create a user becouse of invalid input ', (done)=>{
        const record = {
           email: "samgma111.com",
           first_name: "sugira ",
           last_name: "samuel",
           password: "salvi123",
           address: "kigali",
           is_admin: 1
         }
           chai.request(app)
               .post('/api/v1/auth/signup')
               .send(record)
               .end((err, res)=>{
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(422);
                  res.body.should.have.property('error');
                  done();
              })
       });

  
    
    it('it should reset password  ', (done)=>{
        const record = {
            email: "Dukuzwe@gmail.com",
    
          }
    
            chai.request(app)
                .post('/api/v1/auth/reset')
                .send(record)
              
                .end((err, res)=>{
                    console.log(res.body)
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(201);

                   done();
                
               })
    
        });
        it('it should not login user with wrong password   ', (done)=>{
            const record = {
                email: "Dukuzwe@gmail.com",
                password: "solve545455454",
             
              }
        
                chai.request(app)
                    .post('/api/v1/auth/login')
                    .send(record)
                    .end((err, res)=>{
                        console.log(res.body)
                       res.body.should.be.a('object');
                       res.body.should.have.property('status').eql(401);
                       done();
                   })
            });
        
    
       it('it should not reset  password for unexisting user  ', (done)=>{
        const record = {
            email: "jangmail@gmail.com"
          
         }
           chai.request(app)
               .post('/api/v1/auth/reset')
               .send(record)
               .end((err, res)=>{
                 console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(401);
                  res.body.should.have.property('error');
                  done();
              })
       });

       it('it should return all users ', (done)=>{
      
   
           chai.request(app)
               .get('/api/v1/auth/users')
               .set('authorization', adminToken)
               .end((err, res)=>{
                   console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('data');
                  res.body.should.have.property('status').eql(200);
          
                  done();
               
              })
   
       });
       it('should not returning list of users for unuthorized user  ', (done)=>{
      

        chai.request(app)
            .get('/api/v1/auth/users')
            .set('authorization', userToken)
            .end((err, res)=>{
                console.log(res.body)
               res.body.should.be.a('object');
               res.body.should.have.property('status').eql(401);
               
               done();
            })
    });
    it('should not log for unregistered user  user  ', (done)=>{
        const record = {  
       email :"sagesal@com.salvi",
       password:"usedflekfkerrko"
        }
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(record)
            .end((err, res)=>{
               res.body.should.be.a('object');
               res.body.should.have.property('status').eql(401);
               done();
            })
    });
});
    
   

});