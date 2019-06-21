import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 import {describe,it} from 'mocha';
 


  let userToken,adminToken,ownerToken,carid,orderid;
 chai.use(chaiHttp);
 chai.should();


 describe('get all ads posts ', () => {

	
    
  
   
    

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


 describe.only('Create A car ad', ()=>{
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
			 .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImlyZW5lQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTU2MTA5NTAzNCwiZXhwIjoxNTYxMTgxNDM0fQ.mlb8Med6c3b6tsM3oVrD6UKgQtjI9_sA3U_cs-ozw1s')
			 .send(record)
 		    .end((err, res)=>{
                console.log(res.body)
              
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
               
                done();
              
 		    })
     })
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
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoeWFrYUBnbWFpbC5jb20iLCJyb2xlIjowLCJpYXQiOjE1NjEwOTc3MDksImV4cCI6MTU2MTE4NDEwOX0.LqHC4pLdSzTn8Nn4eINz1SjUjNXAmfCrQnrCwFDnF-Y')
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
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoeWFrYUBnbWFpbC5jb20iLCJyb2xlIjowLCJpYXQiOjE1NjEwOTg4MzIsImV4cCI6MTU2MTE4NTIzMn0.L-9UZ3pYsGBJeOZdy3Dba8D9cCjdEOWED8qWAtK18C8')
            .send(record)
            .end((err, res)=>{
               console.log(res.body)
             
                res.body.should.be.a('object');
               res.body.should.have.property('status').eql(201);
               res.body.should.have.property('data');
              
               done();
             
            })
    })
   
    it('should not posty a car with same plate no ', (done)=>{
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
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoeWFrYUBnbWFpbC5jb20iLCJyb2xlIjowLCJpYXQiOjE1NjEwOTc3MDksImV4cCI6MTU2MTE4NDEwOX0.LqHC4pLdSzTn8Nn4eINz1SjUjNXAmfCrQnrCwFDnF-Y')
            .send(record)
            .end((err, res)=>{
               console.log(res.body)
             
                res.body.should.be.a('object');
               res.body.should.have.property('status').eql(401);
            
              
               done();
             
            })
    })
    it('should not posty a car with same plate no ', (done)=>{
      

        chai.request(app)
            .delete('/api/v1/car/')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoeWFrYUBnbWFpbC5jb20iLCJyb2xlIjowLCJpYXQiOjE1NjEwOTc3MDksImV4cCI6MTU2MTE4NDEwOX0.LqHC4pLdSzTn8Nn4eINz1SjUjNXAmfCrQnrCwFDnF-Y')
            
            .end((err, res)=>{
               console.log(res.body)
             
                res.body.should.be.a('object');
               res.body.should.have.property('status').eql(401);
            
              
               done();
             
            })
    })

    
     
 	

});







 