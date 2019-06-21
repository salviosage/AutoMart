import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 import {describe,it} from 'mocha';
 


  let userToken,adminToken,ownerToken,carid,orderid;
 chai.use(chaiHttp);
 chai.should();


 describe('get all ads posts ', () => {

    before((done)=>{
		const adminInfo = {
            email: "Dukuzwe@gmail.com",
            password: "Dukuzwe@15151",
            
        }
     
        const ownerInfo = {
		   email: "clet@gmail.com",
           password: "Clet@15151",

        }
        const userInfo = {
			email: "lucky@gmail.com",
           password: "Lucky@15151",
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
    describe('Create A car ad', ()=>{
        it('/POST /car', (done)=>{
            const record = { 
                   placNo:"4445",
                   state:"new",
                   status :"available",
                   body_type:"taxi",
                   model :"vw",
                   manufacturer :"vw",
                   price :"12151"
            }
   
            chai.request(app)
                .post('/api/v1/car') 
                .set('authorization', ownerToken)
                .send(record)
                .end((err, res)=>{
                
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(201);
                   res.body.should.have.property('data');
                   console.log(res.body.data.id);
                   carid=res.body.data.id
                   done();
                 
                })
        })
        it('should create flag  ', (done) =>{
            const record = {  
               
                car_id:carid,
                reason: "wired price",
                description:"doesnt matter "
                }
               chai.request(app)
                 .post('/api/v1/flag')
                 .set('authorization', userToken)
                 .send(record)
                 .end((err, res)=>{ 
                       console.log('in a flag',res.body)
                       res.body.should.be.a('object');
                       res.body.should.have.property('status').eql(200);
                       res.body.should.have.property('data');
                       
        
                       done();
                    })
            
               });
        it('should not post a car with same plate no ', (done)=>{
            const record = { 
                   placNo:"4445",
                   state:"new",
                   status :"available",
                   body_type:"taxi",
                   model :"vw",
                   manufacturer :"vw",
                   price :"12151"
            }
    
            chai.request(app)
                .post('/api/v1/car/ds454s5d45d5d5d')
                .set('authorization', ownerToken)
                .send(record)
                .end((err, res)=>{
                   console.log(res.body)
                 
                    res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                
                  
                   done();
                 
                })
        })
        it('/POST /car', (done)=>{
           const record = { 
                  placNo:"44454545",
                  state:"new",
                  status :"available",
                  body_type:"taxi",
                  model :"vw",
                  manufacturer :"vw",
                  price :"12151"
           }
   
           chai.request(app)
               .post('/api/v1/car')
               .set('authorization', ownerToken)
               .send(record)
               .end((err, res)=>{
                  console.log(res.body)
                carid=res.body.data.id;
                 res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(201);
                  res.body.should.have.property('data');
                 
                  done();
                
               })
       })
       it('/POST /order', (done)=>{
           const record = { 
               car_id:carid,
               amount :"1215144"
           }
   
           chai.request(app)
               .post('/api/v1/order')
               .set('authorization', userToken)
               .send(record)
               .end((err, res)=>{
                  console.log(res.body)
                
                   res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(201);
                  res.body.should.have.property('data');
                 
                  done();
                
               })
       })  
        
       it('/GET all cars exist where is available or sold ', (done) =>{
        chai.request(app)
            .get('/api/v1/car')
            .set('authorization', adminToken)
            .end((err, res)=>{
            
               res.should.be.an('object');
               res.body.should.have.property('status').eql(200);
               res.body.should.have.property('data');
               done();
            })
    
       })
     
          it('/GET all cars exist for specidied price range ', (done) =>{
           chai.request(app)
               .get('/api/v1/car?min_price=125&max_price=65465455')
               .set('authorization', userToken)
               .end((err, res)=>{
                 
               res.should.be.an('object');
               res.body.should.have.property('status').eql(200);
               res.body.should.have.property('data');
                res.body.data.should.be.a('array');
              
                  done();
               })
       
          })
   
      
   
         
       it('/GET all cars exist which is available price range  ', (done) =>{
           chai.request(app)
               .get('/api/v1/car?status=available&min_price=125&max_price=65465455')
               .set('authorization', adminToken)
               .end((err, res)=>{
                 
               res.should.be.an('object');
               res.body.should.have.property('status').eql(200);
               res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                  
                  done();
               })
       
          })
      
      it('/GET one AD ', (done) =>{
          chai.request(app)
            .get(`/api/v1/car/${caid}`)
            .set('authorization', adminToken)
            .end((err, res)=>{
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(200);
                  res.body.should.have.property('data');
                  res.body.data.should.be.a('object');
   
                  done();
               })
       
          })
   
          it('/GET not get one car while is not available   ', (done) =>{
           chai.request(app)
             .get(`/api/v1/car/${caid}`)
             .set('authorization', userToken)
             .end((err, res)=>{
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
    
                   done();
                })
        
           })
         
          it('/GET  should not get one ad  when is not valid ', (done) =>{
           chai.request(app)
             .get(`/api/v1/car/${caid}`)
             .set('authorization', adminToken)
             .end((err, res)=>{
            
                  console.log(res.body)  
             
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(400);
                   done();
                })
        
           })
          
          
          it('/PATH car price return an error becouse its is not yours  ', (done) =>{
           const record = {  
               price:"15555"
                       
                        }
              chai.request(app)
                .patch(`/api/v1/car/${caid}/price`)
                .set('authorization', userToken)
                .send(record)
                .end((err, res)=>{
               
                    console.log(res.body)
                      
                      res.body.should.be.a('object');
                      res.body.should.have.property('status').eql(401);
                      res.body.should.have.property('error');
                      
                      done();
                   })
           
              })
   
              it('/PATH car price return an error becouse of invalid input   ', (done) =>{
               const record = {  
                   price:"skdjsdndjnd"
                           
                            }
                  chai.request(app)
                    .patch(`/api/v1/car/${caid}/price`)
                    .set('authorization', userToken)
                    .send(record)
                    .end((err, res)=>{
                   
                        console.log(res.body)
                          
                          res.body.should.be.a('object');
                          res.body.should.have.property('error').eql('"price" must be a number')
                          done();
                       })
               
                  })
   
   
           it('/PATH car price of a car  ', (done) =>{
           const record = {  
               price:"15555"
                       
                           }
               chai.request(app)
                   .patch(`/api/v1/car/${caid}/price`)
                   .set('authorization', adminToken)
                   .send(record)
                   .end((err, res)=>{
               
                       console.log(res.body)
                       
                       res.body.should.be.a('object');
                       res.body.should.have.property('status').eql(200);
                       res.body.should.have.property('data');
                       
                       done();
                   })
           
               })
       
        it('/PATH car status retun an eror access denied  ', (done) =>{
       const record = {  
           status:"sold"
                   
                    }
          chai.request(app)
            .patch(`/api/v1/car/${caid}/status`)
            .set('token', adminToken)
            .send(record)
            .end((err, res)=>{
           
                
                console.log(res.body)
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(401);
                  res.body.should.have.property('error');
                 
   
                  done();
               })
           })
               it('/delete  car  ', (done) =>{
                      chai.request(app)
                        .delete(`/api/v1/car/${caid}`)
                        .set('token', adminToken)
                       
                        .end((err, res)=>{
                       
                            
                              res.body.should.be.a('object');
                              res.body.should.have.property('status').eql(200);
                              res.body.should.have.property('data').eql( 'car deleted successfully')
                             
                              done();
                           })
                   
                      })
               it('/not delete a car if user is not admin or owner   ', (done) =>{
               chai.request(app)
                   .delete(`/api/v1/car/${caid}/price`)
                   .set('token', userToken)
                   
                   .end((err, res)=>{
                   
                       
                       res.body.should.be.a('object');
                       res.body.should.have.property('error').eql('access denied  !');
                       
                       
                       done();
                       })
               
               })
   

   }); });
   
  







 