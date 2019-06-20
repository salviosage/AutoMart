import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';

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
               .post('/api/v1/auth/reset')
               .send(record)
               .end((err, res)=>{
                   console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(201);
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

                  done();
               
              })
   
       });
       it('it should not create a user becouse of invalid input ', (done)=>{
        const record = {
           email: "samgma.com",
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
            email: "salviosagegmail.com",
         
          }
    
            chai.request(app)
                .post('/api/v1/auth/reset')
                .send(record)
              console.log(res.body)
                .end((err, res)=>{
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(201);

                   done();
                
               })
    
        });
        it('it should not login user with wrong password   ', (done)=>{
            const record = {
                email: "dukuzwe@gmail.com",
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
                  done();
              })
       });

       it('it should return all users ', (done)=>{
      
   
           chai.request(app)
               .get('/api/v1/auth/users')
               .set('Authorization', adminToken)
               .end((err, res)=>{
                   console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('data');
            	  res.body.data.should.be.a('array');
                  res.body.should.have.property('status').eql(200);
          
                  done();
               
              })
   
       });
       it('should not returning list of users for unuthorized user  ', (done)=>{
      

        chai.request(app)
            .get('/api/v1/auth/users')
            .set('Authorization', userToken)
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