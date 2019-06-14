// import  chai from 'chai';
//  import chaiHttp from 'chai-http';
//  import app from '../server';
 

//  chai.should();
//   let userToken,adminToken,ownerToken;
//  chai.use(chaiHttp);

// describe('POST /AUTH', ()=>{
//     before((done)=>{
// 		const adminInfo = {
// 			email: "salviosage@gmail.com",
// 			password: "121621454655"
//         }
//         const ownerInfo = {
// 			email: "jeasal@gmail.com",
// 			password: "1216214546155"
//         }
//         const userInfo = {
// 			email: "sagesalvi@com.salvi",
// 			password: "1216214546155"
// 		}
       

// 		chai.request(app)
// 		.post('/api/v1/auth/login')
// 		.send(adminInfo)
// 		.end((err, res)=>{
            
// 			 adminToken = res.body.token;
			
//         })

//     chai.request(app)
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
  
   
//     it('it should create a user and return tokken ', (done)=>{
//      const record = {
//         email: "sam@gmail.com",
//         first_name: "sugira ",
//         last_name: "samuel",
//         password: "salvi123",
//         address: "kigali",
//         is_admin: 1
//       }

//         chai.request(app)
//             .post('/api/v1/auth/signup')
//             .send(record)
            
//             .end((err, res)=>{
              
//                res.body.should.be.a('object');
//                res.body.should.have.property('status').eql(200);
//                res.body.should.have.property('message');
//                res.body.should.have.property('token');
//                res.body.should.have.property('userName').eql('sam@gmail.com');
               
//                done();
            
//            })

//     });
//     it('it should login and return token  ', (done)=>{
//         const record = {
//            email: "salviosage@gmail.com",
//            password: "121621454655",
        
//          }
   
//            chai.request(app)
//                .post('/api/v1/auth/login')
//                .send(record)

//                .end((err, res)=>{
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('status').eql(200);
//                   res.body.should.have.property('message').eql('successfully logged in ');
//                   res.body.should.have.property('token');
//                   res.body.should.have.property('userName').eql('salviosage@gmail.com');
                  
//                   done();
               
//               })
   
//        });
//        it('it should reset password for existing user ', (done)=>{
//         const record = {
//            email: "salviosage@gmail.com",
         
//         }
   
//            chai.request(app)
//                .patch('/api/v1/auth/reset')
//                .send(record)
//                .end((err, res)=>{
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('status').eql(200);
//                   res.body.should.have.property('message').eql('your password has been reseted to your first name');
//                   res.body.should.have.property('userName').eql('salviosage@gmail.com');
                  
//                   done();
               
//               })
   
//        });
//        it('it should return all users  ', (done)=>{
      
   
//            chai.request(app)
//                .get('/api/v1/auth/users')
//                .set('token', adminToken)
//                .end((err, res)=>{
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('data');
//             	  res.body.data.should.be.a('array');
//                   res.body.should.have.property('status').eql(200);
             
                  
                  
//                   done();
               
//               })
   
//        });
//        it('should not returning list of users for unuthorized user  ', (done)=>{
//         const record = {  
//        email :"sagesal@com.salvi",
//        password:"used"
//         }

//         chai.request(app)
//             .get('/api/v1/auth/users')
//             .send(record)
//             .end((err, res)=>{
//                res.body.should.be.a('object');
               
//                res.body.should.have.property('status').eql(401);
               
//                done();
//             })
//     });
//     it('should not log for unregistered user  user  ', (done)=>{
//         const record = {  
//        email :"sagesal@com.salvi",
//        password:"used"
//         }

//         chai.request(app)
//             .post('/api/v1/auth/login')
//             .send(record)
//             .end((err, res)=>{
//                res.body.should.be.a('object');
               
//                res.body.should.have.property('status').eql(401);
//                done();
//             })
//     });
   

// })
 