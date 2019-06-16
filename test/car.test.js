import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 import {describe,it} from 'mocha';
 


  let userToken,adminToken,ownerToken;
 chai.use(chaiHttp);
 chai.should();


 describe('get all ads posts ', () => {

	before((done)=>{
		
        const unouthorized = {
			email: "clet@gmail.com",
			password: "121621"
        }
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
    
  
   
    

	// it('/GET all cars exist where is available or sold ', (done) =>{
	//  chai.request(app)
	// 	 .get('/api/v1/car')
	// 	 .set('token', adminToken)
	// 	 .end((err, res)=>{
    //      
	// 		res.should.be.an('object');
	// 		res.body.should.have.property('status').eql(200);
	// 		res.body.should.have.property('data');
	// 		res.data.should.be.a('array');
			
	// 		done();
	// 	 })
 
    // })
  
    //    it('/GET all cars exist for specidied price range ', (done) =>{
    //     chai.request(app)
    //         .get('/api/v1/car?min_price=125&max_price=65465455')
    //         .set('token', userToken)
    //         .end((err, res)=>{
              
    //         res.should.be.an('object');
    //         res.body.should.have.property('status').eql(200);
    //         res.body.should.have.property('data');
    //          res.body.data.should.be.a('array');
   		
    //            done();
    //         })
    
    //    })

   

      
    // it('/GET all cars exist which is available price range  ', (done) =>{
    //     chai.request(app)
    //         .get('/api/v1/car?status=available&min_price=125&max_price=65465455')
    //         .set('token', adminToken)
    //         .end((err, res)=>{
              
    //         res.should.be.an('object');
    //         res.body.should.have.property('status').eql(200);
    //         res.body.should.have.property('data');
    //          res.body.data.should.be.a('array');
   			
    //            done();
    //         })
    
    //    })
   
   it('/GET one AD ', (done) =>{
       chai.request(app)
		 .get('/api/v1/car/ffdfzfzef5f5zef5d5')
         .set('token', adminToken)
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
          .get('/api/v1/car/ffdfzfzef5f5z')
          .set('token', userToken)
          .end((err, res)=>{
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(401);
                res.body.should.have.property('error').eql('call you want to car not found from one add get!');
               
 
                done();
             })
     
        })
      
       it('/GET  should not get one ad  when is not valid ', (done) =>{
        chai.request(app)
          .get('/api/v1/car/--ffdfzfzef5f5zef5d5')
          .set('token', adminToken)
          .end((err, res)=>{
         
               console.log(res.body)  
          
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('error').eql('"id" must only contain alpha-numeric characters');
               
 
                done();
             })
     
        })
       
       
       it('/PATH car price return an error becouse its is not yours  ', (done) =>{
        const record = {  
            price:"15555"
                    
                     }
           chai.request(app)
             .patch('/api/v1/car/ffdfzfzef5f5z/price')
             .set('token', userToken)
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
                 .patch('/api/v1/car/ffdfzfzef5f5z/price')
                 .set('token', userToken)
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
                .patch('/api/v1/car/ffdfzfzef5f5z/price')
                .set('token', adminToken)
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
		 .patch('/api/v1/car/ffdfzfzef5f5zef5d5/status')
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
                     .delete('/api/v1/car/ffdfzfzef5f5z')
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
                .delete('/api/v1/car/ffdfzfzef5f5zef54e')
                .set('token', userToken)
                
                .end((err, res)=>{
                
                    
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('access denied  !');
                    
                    
                    done();
                    })
            
            })

                    it('/not delete a car becouse of invalid parameters   ', (done) =>{
                        chai.request(app)
                          .delete('/api/v1/car/--ffdfzfzef5f5zef54e')
                          .set('token', userToken)
                         
                          .end((err, res)=>{
                         
                              console.log(res.body)
                                res.body.should.be.a('object');
                                res.body.should.have.property('error').eql('"id" must only contain alpha-numeric characters');
                               
                               
                                done();
                             })
                     
                        })
    
       


 });


 describe('Create A car ad', ()=>{
 	it('/POST /car', (done)=>{
 		const record = {  
        
    
        body_type :"truc",
        model :"benz",
        manufacturer :"mercedes",
        price :"5144",
        
 		}

 		chai.request(app)
			 .post('/api/v1/car')
			 .set('token', adminToken)
			 .send(record)
 		    .end((err, res)=>{
                console.log(res.body)
              
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
               
                done();
              
 		    })
 	})

    
        it('should not post a car ad while there is invalid parameter', (done)=>{
            const record = {  
           
           state:"used",
           body_type :"truc",
          
           manufacturer :"mercedes",
           price :"5144",
           
            }
   
            chai.request(app)
                .post('/api/v1/car')
                .set('token', userToken)
                .send(record)
                .end((err, res)=>{
                   
                 console.log(res.body)
                    res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   res.body.should.have.property ('error_msg').eql('"model" is required');
                  
                   done();
                 
                })
        })
 	it('not post a car if user is anoninous ', (done)=>{
        const record = {  
       owner :"sagesalvi@gmail.comsalvi",
       state:"used",
       body_type :"truc",
       model :"benz",
       manufacturer :"mercedes",
       price :"5144",
       
        }

        chai.request(app)
            .post('/api/v1/car')
            .send(record)
            .end((err, res)=>{
              
                res.body.should.be.a('object');
               res.body.should.have.property('status').eql(401);
               done();
            })
    })

});







 