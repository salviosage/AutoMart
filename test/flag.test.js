import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 

 chai.should();
  let userToken,adminToken,ownerToken;
 chai.use(chaiHttp);


 describe('creating ad order  ', () => {

	before((done)=>{
		
       
        const adminInfo = {
			email: "salviosage@gmail.com",
			password: "15151"
        }
        const ownerInfo = {
			email: "jeasal@gmail.com",
			password: "1515"
        }
        const userInfo = {
			email: "sagesalvi@com.salvi",
			password: "151"
		}
       
    chai.request(app)
        .post('/api/v1/auth/login')
      
        .send(adminInfo)
        .end((err, res)=>{
            
           adminToken = res.body.token;
            
         
        })
	
    chai.request(app)
        .post('/api/v1/auth/login')
      
        .send(userInfo)
        .end((err, res)=>{
            
            userToken = res.body.token;
            
            done();
        })
	
    })
  
   
   
    it('should create flag  ', (done) =>{
        const record = {  
           
            car_id:"ffdfzfzef5f5zef5d5",
            reason: "wired price",
            description:"doesnt matter "
            }
           chai.request(app)
             .post('/api/v1/flag')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{ 
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(200);
                   res.body.should.have.property('data');
                   
    
                   done();
                })
        
           });
           it('should create flag with no description  ', (done) =>{
            const record = {  
               
                car_id:"ffdfzfzef5f5zef5d5",
                reason: "wired price",
                
                }
               chai.request(app)
                 .post('/api/v1/flag')
                 .set('token', userToken)
                 .send(record)
                 .end((err, res)=>{ 
                       
                       res.body.should.be.a('object');
                       res.body.should.have.property('status').eql(200);
                       res.body.should.have.property('data');
                       
        
                       done();
                    })
            
               });
   
   
       it('should not create a flag for a car which is not available ', (done) =>{
        const record = {  
           
            car_id:"ffdfzfzef5f5z",
            reason: "wired price",
            description:"doesnt matter "
            }
           chai.request(app)
             .post('/api/v1/flag')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{ 
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   res.body.should.have.property('error').eql('car you want to flag  not found!')
                   
    
                   done();
                })
        
           });


           it('should not create flag while unput is invalid   ', (done) =>{
            const record = {  
               
                car_id:"",
                reason: "wired price",
                description:"doesnt matter "
                }
               chai.request(app)
                 .post('/api/v1/flag')
                 .set('token', userToken)
                 .send(record)
                 .end((err, res)=>{ 
        
                       res.body.should.be.a('object');
                       res.body.should.have.property('error_msg').eql('"car_id" is not allowed to be empty')
                       
        
                       done();
                    })
            
               });
    
           
       it('return an error user is trying to flag a post which is not available  ', (done) =>{
        const record = {  
           
            car_id:"ffdfzfzef5f",
            reason: "wired price",
            description:"doesnt matter "
            }
           chai.request(app)
             .post('/api/v1/flag')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{ 
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   res.body.should.have.property('error').eql('car you want to flag  not found!')
                   
    
                   done();
                })
        
           });

           
            it('it should get all flags   ', (done) =>{
              
                   chai.request(app)
                     .get('/api/v1/flag')
                     .set('token', adminToken)
                     .end((err, res)=>{
                        
                   
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('data');
                       
                        
                        done();
                     })
             
                });
               

                it('it should not get all flg while user is not admin   ', (done) =>{
              
                    chai.request(app)
                      .get('/api/v1/flag')
                      .set('token', userToken)
                      .end((err, res)=>{
                         
                         console.log(res.body);
                         res.body.should.be.a('object');
                         res.body.should.have.property('status').eql(401);
                         res.body.should.have.property('error');
                        
                         
                         done();
                      })
              
                 });
       
      
  });