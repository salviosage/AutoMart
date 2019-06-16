// import  chai from 'chai';
//  import chaiHttp from 'chai-http';
//  import app from '../server';
 

//  chai.should();
//   let userToken,adminToken,ownerToken;
//  chai.use(chaiHttp);


//  describe('creating ad order  ', () => {

// 	before((done)=>{
//         const adminInfo = {
// 			email: "salviosage@gmail.com",
// 			password: "15151"
//         }
//         const ownerInfo = {
// 			email: "jeasal@gmail.com",
// 			password: "1515"
//         }
//         const userInfo = {
// 			email: "sagesalvi@com.salvi",
// 			password: "151"
// 		}
       

// 		chai.request(app)
// 		.post('/api/v1/auth/login')
// 		.send(adminInfo)
// 		.end((err, res)=>{
            
// 			 adminToken = res.body.token;
			
//         })
//         chai.request(app)
//     .post('/api/v1/auth/login')
    
//     .send(ownerInfo)
//     .end((err, res)=>{
        
//          ownerToken = res.body.token;
       
        
//     })
       
//     chai.request(app)
//         .post('/api/v1/auth/login')
      
//         .send(userInfo)
//         .end((err, res)=>{
            
//             userToken = res.body.token;
            
//             done();
//         })
	
//     })
  
   
    

// it('/post  /ORDER ', (done) =>{
//     const record = {  
//         car_id: "ffdfzfzef5f5zef54e",
//         amount:"11515555"
                
//          		}
//        chai.request(app)
// 		 .post('/api/v1/order')
//          .set('token', userToken)
//          .send(record)
// 		 .end((err, res)=>{
           
//             res.body.should.be.a('object');
           
// 			res.body.should.have.property('status').eql(200);
// 			res.body.should.have.property('data');
// 			res.body.data.should.be.a('object');
			
// 			done();
// 		 })
 
//     })
    
//     it('/post  /ORDER  it should not create order while there is data calidation error ', (done) =>{
//         const record = {  
//             car_id: "ffdfzfzef5f5zef54e",
            
                    
//                      }
//            chai.request(app)
//              .post('/api/v1/order')
//              .set('token', userToken)
//              .send(record)
//              .end((err, res)=>{
//                console.log(res.body)
//                 res.body.should.be.a('object');
               
//                 res.body.should.have.property('error_msg').eql('"amount" is required');
               
                
//                 done();
//              })
     
//         })

//         it('/post  /ORDER  it should not create order while car is not found  ', (done) =>{
//             const record = {  
//                 car_id: "ffdfzfzef5f5z",
//                 amount:5445454455,
                        
//                          }
//                chai.request(app)
//                  .post('/api/v1/order')
//                  .set('token', userToken)
//                  .send(record)
//                  .end((err, res)=>{
//                    console.log(res.body)
//                     res.body.should.be.a('object');
                   
//                     res.body.should.have.property('status').eql(400);
//                     res.body.should.have.property('error').eql('call you want to order not found!');
                   
                    
//                     done();
//                  })
         
//             })
   

   
//    it('/PATH order price ', (done) =>{
//     const record = {  
        
//         amount:"15555"
                
//          		}
//        chai.request(app)
// 		 .patch('/api/v1/order/91af9944-e3de-47b3-9ece-cbda9e/price')
//          .set('token', userToken)
//          .send(record)
// 		 .end((err, res)=>{
        
           
               
//                res.body.should.be.a('object');
//                res.body.should.have.property('status').eql(200);
//                res.body.should.have.property('data');
//                res.body.data.should.be.a('object');

//                done();
//             })
    
//        })

//        it('/PATH order price while is not yours ', (done) =>{
//         const record = {  
            
//             amount:"15555"
                    
//                      }
//            chai.request(app)
//              .patch('/api/v1/order/91af9944-e3de-47b3-9ece-cbda9e/price')
//              .set('token', ownerToken)
//              .send(record)
//              .end((err, res)=>{
            
               
                   
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('status').eql(401);
//                    res.body.should.have.property('error').eql('invalid request!');
//                    done();
//                 })
        
//            })

//        it('/PATH order price should not working while input is not valid ', (done) =>{
//         const record = {  
            
                    
//                      }
//            chai.request(app)
//              .patch('/api/v1/order/91af9944-e3de-47b3-9ece-cbda9e/price')
//              .set('token', userToken)
//              .send(record)
//              .end((err, res)=>{
            
               
//                    console.log(res.body)
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('error_msg').eql('"amount" is required');
//                    done();
//                 })
        
//            })
       

    
//      it('/PATH order status ', (done) =>{
//     const record = {  
        
//         status:"sold"
                
//          		}
//        chai.request(app)
// 		 .patch('/api/v1/order/91af9944/status')
//          .set('token', adminToken)
//          .send(record)
// 		 .end((err, res)=>{
        
           
               
//                res.body.should.be.a('object');
//                res.body.should.have.property('status').eql(200);
//                res.body.should.have.property('data');
//                res.body.data.should.be.a('object');

//                done();
//             })
    
//        })
//        it('/PATH order status is gonna fail for invalid input  ', (done) =>{
//         const record = {  
            
//             status:5454,
                    
//                      }
//            chai.request(app)
//              .patch('/api/v1/order/91af9944/status')
//              .set('token', adminToken)
//              .send(record)
//              .end((err, res)=>{
//                  console.log(res.body);
 
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('error_msg').eql('"status" must be a string');

//                    done();
//                 })
        
//            })
//        it('/GET all orders if is admin ', (done) =>{
      
//            chai.request(app)
//              .get('/api/v1/order')
//              .set('token', adminToken)
//              .end((err, res)=>{
            
               
                   
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('status').eql(200);
//                    res.body.should.have.property('data');
//                    res.body.data.should.be.a('array');
    
//                    done();
//                 })
        
//            })
//            it('/ not GET all orders if is not  admin ', (done) =>{
      
//             chai.request(app)
//               .get('/api/v1/order')
//               .set('token', userToken)
//               .end((err, res)=>{
             
                
                    
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('status').eql(400);
//                     res.body.should.have.property('error');
                    
     
//                     done();
//                  })
         
//             })
//        it('return an error user is trying to update status of order which is not assigned to him  ', (done) =>{
//         const record = {  
            
//             status:"sold"
                    
//                      }
//            chai.request(app)
//              .patch('/api/v1/order/91af9944-e3de-47b3/status')
//              .set('token', userToken)
//              .send(record)
//              .end((err, res)=>{
            
               
                   
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('status').eql(401);
                   
    
//                    done();
//                 })
        
//            })
       
//        it('/PATH order status return error that car is not found  ', (done) =>{
//         const record = {  
            
//             status:"sold"
                    
//                      }
//            chai.request(app)
//              .patch('/api/v1/order/91af9944-e3de-/status')
//              .set('token', userToken)
//              .send(record)
//              .end((err, res)=>{
            
                
                   
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('status').eql(401);
//                    done();
//                 })
        
//            })
//   });
 