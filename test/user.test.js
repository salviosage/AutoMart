import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';

 let newUser ="token";
 

 chai.should();
  let userToken,adminToken,ownerToken,anyToken="";
 chai.use(chaiHttp);

describe('POST /AUTH', ()=>{
    before((done)=>{
		const adminInfo = {
			email: "salviosage@gmail.com",
			password: "Dukuzwe@15151"
        }
        const ownerInfo = {
			email: "jeasal@gmail.com",
			password: "Dukuzwe@15151"
        }
        const userInfo = {
			email: "sagesalvi@com.salvi",
			password: "Dukuzwe@15151"
		}
       

		chai.request(app)
		.post('/api/v1/auth/login')
		.send(adminInfo)
		.end((err, res)=>{
            
			 adminToken = res.body.token;
			
        })

    chai.request(app)
    .post('/api/v1/auth/login')
    .send(ownerInfo)
    .end((err, res)=>{
        
         ownerToken = res.body.token;
       
        
    })
       
    chai.request(app)
        .post('/api/v1/auth/login')
        .send(userInfo)
        .end((err, res)=>{
            
            userToken = res.body.token;
            
            done();
        })
	
    })
  
   describe("test when a user does not exist in the db ",()=> { 

       it('it should create a user and return tokken ', (done)=>{
        const record = {
           email: "clet@gmil.com",
           first_name: "mwunguzi",
           last_name: "lucky",
           password: "Dukuzwe@15151",
           confirmPassword :"Dukuzwe@15151",
           address: "kigali",
           is_admin: 0
         }
   
           chai.request(app)
               .post('/api/v1/auth/signup')
               .send(record)
               
               .end((err, res)=>{
              
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(200);
                  res.body.should.have.property('message').eql('User registered sucessfuly!');
                  res.body.should.have.property('token');
                  newUser=res.body.token;
                  
                  done();
               
              })
   
       });
       it('it should create an admin  user and return token ', (done)=>{
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
                console.log(res.body)
                 
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(200);
                  res.body.should.have.property('message').eql('User registered sucessfuly!');
                  res.body.should.have.property('token');
                  newUser=res.body.token;
                  done();
               
              })
   
       });
       it.only('it should not create a user becouse of invalid input ', (done)=>{
        const record = {
           email: "samgmail.com",
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
      
       it('/GET one AD ', (done) =>{
        chai.request(app)
          .get('/api/v1/car/ffdfzfzef5f5zef5d5')
          .set('Authorization', newUser)
          .end((err, res)=>{
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(401);
              res.body.should.have.property("error").eql('Authentiction failed ' );
                done();
             })
     
        });

        it('should not log  in for user with invalid token  user  user  ', (done)=>{
            const record = {  
           email :"sagesal@com.salvi",
           password:"used"
            }
           
    
            chai.request(app)
                .get('/api/v1/car/ffdfzfzef5f5zef5d5')
                .set('authorization', newUser)
                .send(record)
                .end((err, res)=>{
                    console.log(res.body);
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   res.body.should.have.property("success").eql(false);
                   res.body.should.have.property("message").eql('Token is not valid');
                   done();
                })
        });

       


   })
    
    it('it should login and return token  ', (done)=>{
        const record = {
            email: "salviosage@gmail.com",
            password: "DUKUZWENIMANA",
         
          }
    
            chai.request(app)
                .post('/api/v1/auth/login')
                .send(record)
 
                .end((err, res)=>{
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(200);
                   res.body.should.have.property('message').eql('User sign in is sucessfuly!');
                   res.body.should.have.property('token');
                  
                   
                   done();
                
               })
    
        });
        it.only('it should not login user with wrong password   ', (done)=>{
            const record = {
                email: "salviosage@gmail.com",
                password: "solve545455454",
             
              }
        
                chai.request(app)
                    .post('/api/v1/auth/login')
                    .send(record)
                    .end((err, res)=>{
                        console.log(res.body)
                       res.body.should.be.a('object');
                       res.body.should.have.property('status').eql(401);
                       res.body.should.have.property('error').eql('Incorrect password!');
                    
                       
                       done();
                    
                   })
        
            });
        
       it('it should return error for invalid input   ', (done)=>{
        const record = {
        
          }
    
            chai.request(app)
                .post('/api/v1/auth/login')
                .send(record)
 
                .end((err, res)=>{
                   res.body.should.be.a('object');
                   console.log(res.body)
                   res.body.should.have.property('error_msg').eql('"email" is required');
                   
                   
                   done();
                
               })
    
        });
       it('it should reset password for existing user ', (done)=>{
        const record = {
           email: "salviosage@gmail.com",
         
        }
   
           chai.request(app)
               .patch('/api/v1/auth/reset')
               .send(record)
               .end((err, res)=>{
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(200);
                  res.body.should.have.property('message').eql('your password has been reseted to your first name');
                
                  
                  done();
               
              })
   
       });
       it('it should not reset  password for unexisting user  ', (done)=>{
        const record = {
            email: "jangmail.com"
          
         }
           chai.request(app)
               .post('/api/v1/auth/reset')
               .send(record)
               
               .end((err, res)=>{
                 console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(401);
                  res.body.should.have.property('error').eql('User not found!');
                
                  done();
               
              })
   
       });
       it.only('it should not reset  password for user with invalid email  ', (done)=>{
        const record = {
     
         }
   
           chai.request(app)
               .post('/api/v1/auth/reset')
               .send(record)
               
               .end((err, res)=>{
                 
                  res.body.should.be.a('object');
                 console.log(res.body);
                  res.body.should.have.property('error_msg').eql( '"email" must be a valid email');
                
                  done();
               
              })
   
       });
       it.only('it should return all users  ', (done)=>{
      
   
           chai.request(app)
               .get('/api/v1/auth/users')
               .set('token', adminToken)
               .end((err, res)=>{
                  res.body.should.be.a('object');
                  res.body.should.have.property('data');
            	  res.body.data.should.be.a('array');
                  res.body.should.have.property('status').eql(200);
             
                  
                  
                  done();
               
              })
   
       });
       it('should not returning list of users for unuthorized user  ', (done)=>{
        const record = {  
       email :"sagesal@com.salvi",
       password:"used"
        }

        chai.request(app)
            .get('/api/v1/auth/users')
            .send(record)
            .end((err, res)=>{
               res.body.should.be.a('object');
               
               res.body.should.have.property('status').eql(401);
               
               done();
            })
    });
    it('should not log for unregistered user  user  ', (done)=>{
        const record = {  
       email :"sagesal@com.salvi",
       password:"used"
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
    
   

})
 