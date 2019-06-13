import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 import {describe,it} from 'mocha';
 


  let userToken,adminToken,ownerToken;
 chai.use(chaiHttp);
 chai.should();


 describe('get all ads posts ', () => {

	before((done)=>{
		const adminInfo = {
			email: "salviosage@gmail.com",
			password: "121621454655"
        }
        const ownerInfo = {
			email: "jeasal@gmail.com",
			password: "1216214546155"
        }
        const userInfo = {
			email: "sagesalvi@com.salvi",
			password: "1216214546155"
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
  
   
    

	it('/GET all cars exist where is available or sold ', (done) =>{
	 chai.request(app)
		 .get('/api/v1/car')
		 .set('token', adminToken)
		 .end((err, res)=>{
           
			res.should.be.an('object');
			res.body.should.have.property('status').eql(200);
			res.body.should.have.property('data');
			res.data.should.be.a('array');
			res.body.data[0].should.have.property('id');
			res.body.data[0].should.have.property('owner');
			res.body.data[0].should.have.property('state');
			res.body.data[0].should.have.property('status');
			res.body.data[0].should.have.property('body_type');
            res.body.data[0].should.have.property('model');
            res.body.data[0].should.have.property('manufacturer');
			res.body.data[0].should.have.property('price');
			res.body.data[0].should.have.property('created_on');
			res.body.data[0].should.have.property('modified_on');
			done();
		 })
 
    })
    // it('/GET all cars exist which is available  ', (done) =>{
    //     chai.request(app)
    //         .get('/api/v1/car?status=available')
    //         .set('token', userToken)
    //         .end((err, res)=>{
    //            console.log(adminToken);
    //            console.log(res.body);
    //         res.should.be.an('object');
    //         res.body.should.have.property('status').eql(200);
    //         res.body.should.have.property('data');
    //          res.body.data.should.be.a('array');
   	// 		res.body.data[0].should.have.property('id');
   	// 		res.body.data[0].should.have.property('owner');
   	// 		res.body.data[0].should.have.property('state');
   	// 		res.body.data[0].should.have.property('status');
   	// 		res.body.data[0].should.have.property('body_type');
    //         res.body.data[0].should.have.property('model');
    //         res.body.data[0].should.have.property('manufacturer');
   	// 		res.body.data[0].should.have.property('price');
   	// 		res.body.data[0].should.have.property('created_on');
   	// 		res.body.data[0].should.have.property('modified_on');
    //            done();
    //         })
    
    //    })
       it('/GET all cars exist for specidied price range ', (done) =>{
        chai.request(app)
            .get('/api/v1/car?min_price=125&max_price=65465455')
            .set('token', userToken)
            .end((err, res)=>{
              
            res.should.be.an('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('data');
             res.body.data.should.be.a('array');
   			res.body.data[0].should.have.property('id');
   			res.body.data[0].should.have.property('owner');
   			res.body.data[0].should.have.property('state');
   			res.body.data[0].should.have.property('status');
   			res.body.data[0].should.have.property('body_type');
            res.body.data[0].should.have.property('model');
            res.body.data[0].should.have.property('manufacturer');
   			res.body.data[0].should.have.property('price');
   			res.body.data[0].should.have.property('created_on');
   			res.body.data[0].should.have.property('modified_on');
               done();
            })
    
       })

    //    it('/GET all cars exist for specific manufacturer   ', (done) =>{
    //     chai.request(app)
    //         .get('/api/v1/car?manufacturer=mercedes')
    //         .set('token', userToken)
    //         .end((err, res)=>{
    //            console.log(adminToken);
    //            console.log(res.body);
    //         res.should.be.an('object');
    //         res.body.should.have.property('status').eql(200);
    //         res.body.should.have.property('data');
    //          res.body.data.should.be.a('array');
   	// 		res.body.data[0].should.have.property('id');
   	// 		res.body.data[0].should.have.property('owner');
   	// 		res.body.data[0].should.have.property('state');
   	// 		res.body.data[0].should.have.property('status').eql('avalable');
   	// 		res.body.data[0].should.have.property('body_type');
    //         res.body.data[0].should.have.property('model');
    //         res.body.data[0].should.have.property('manufacturer').eql('mercedes');
   	// 		res.body.data[0].should.have.property('price');
   	// 		res.body.data[0].should.have.property('created_on');
   	// 		res.body.data[0].should.have.property('modified_on');
    //            done();
    //         })
    
    //    })


      
    it('/GET all cars exist which is available price range  ', (done) =>{
        chai.request(app)
            .get('/api/v1/car?status=available&min_price=125&max_price=65465455')
            .set('token', adminToken)
            .end((err, res)=>{
              
            res.should.be.an('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('data');
             res.body.data.should.be.a('array');
   			res.body.data[0].should.have.property('id');
   			res.body.data[0].should.have.property('owner');
   			res.body.data[0].should.have.property('state');
   			res.body.data[0].should.have.property('status').eql('available');
   			res.body.data[0].should.have.property('body_type');
            res.body.data[0].should.have.property('model');
            res.body.data[0].should.have.property('manufacturer');
   			res.body.data[0].should.have.property('price');
   			res.body.data[0].should.have.property('created_on');
   			res.body.data[0].should.have.property('modified_on');
               done();
            })
    
       })
   
   it('/GET one AD ', (done) =>{
       chai.request(app)
		 .get('/api/v1/car/ffdfzfzef5f5zef5')
         .set('token', userToken)
		 .end((err, res)=>{
        
                
               
               res.body.should.be.a('object');
               res.body.should.have.property('status').eql(200);
               res.body.should.have.property('data');
               res.body.data.should.be.a('object');

               done();
            })
    
       })
       
       it('/PATH car price ', (done) =>{
        const record = {  
            price:"15555"
                    
                     }
           chai.request(app)
             .patch('/api/v1/car/ffdfzfzef5f5zef5/price')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{
            
                   
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(200);
                   res.body.should.have.property('data');
                   res.body.data.should.be.a('object');
    
                   done();
                })
        
           })

    
     it('/PATH car status ', (done) =>{
    const record = {  
        status:"sold"
                
         		}
       chai.request(app)
		 .patch('/api/v1/car/ffdfzfzef5f5zef5/status')
         .set('token', userToken)
         .send(record)
		 .end((err, res)=>{
        
             
               
               res.body.should.be.a('object');
               res.body.should.have.property('status').eql(200);
               res.body.should.have.property('data');
               res.body.data.should.be.a('object');

               done();
            })
        })
            it('/delete  car  ', (done) =>{
                   chai.request(app)
                     .delete('/api/v1/car/ffdfzfzef5f5zef5')
                     .set('token', userToken)
                    
                     .end((err, res)=>{
                    
                           
                           res.body.should.be.a('object');
                           res.body.should.have.property('status').eql(200);
                          
                           done();
                        })
                
                   })
    
       


 });


 describe('Create A car ad', ()=>{
 	it('/POST /car', (done)=>{
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
			 .set('token', userToken)
			 .send(record)
 		    .end((err, res)=>{
              
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                // res.body.data.should.be.a('array');
                // res.body.data[0].should.have.property('id');
                // res.body.data[0].should.have.property('owner').eql('sagesalvi@com.salvi');
                // res.body.data[0].should.have.property('state').eql('used');
                // res.body.data[0].should.have.property('status').eql('available');
                // res.body.data[0].should.have.property('body_type').eql('truc');
                // res.body.data[0].should.have.property('model').eql('benz');
                // res.body.data[0].should.have.property('manufacturer').eql('mercedes');
                // res.body.data[0].should.have.property('price').eql("5144");
                // res.body.data[0].should.have.property('created_on');
                // res.body.data[0].should.have.property('modified_on');
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







 