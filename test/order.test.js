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
  
   
    

it('/post  /ORDER ', (done) =>{
    const record = {  
        contact: "salviosage@gmail.com",
        car_id: "ffdfzfzef5f5zef54e",
        amount:"11515555"
                
         		}
       chai.request(app)
		 .post('/api/v1/order')
         .set('token', userToken)
         .send(record)
		 .end((err, res)=>{
            
            res.body.should.be.a('object');
           
			res.body.should.have.property('status').eql(200);
			res.body.should.have.property('data');
			res.body.data.should.be.a('object');
			// res.body.data.should.have.property('id');
			// res.body.data.should.have.property('contact');
			// res.body.data.should.have.property('car_id');
			// res.body.data.should.have.property(' amount');
			// res.body.data.should.have.property('status');
            // res.body.data.should.have.property('created_on');
            // res.body.data.should.have.property('modified_on');
			done();
		 })
 
    })
   

   
   it('/PATH order price ', (done) =>{
    const record = {  
        
        amount:"15555"
                
         		}
       chai.request(app)
		 .patch('/api/v1/order/91af9944/price')
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
       

    
     it('/PATH order status ', (done) =>{
    const record = {  
        contact:"jeasal@gmail.comsalvi",
        status:"sold"
                
         		}
       chai.request(app)
		 .patch('/api/v1/order/91af9944-e3de-47b3/status')
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
       it('return an error user is trying to update status of order which is not assigned to him  ', (done) =>{
        const record = {  
            contact:"jeasal@gmail.com",
            status:"sold"
                    
                     }
           chai.request(app)
             .patch('/api/v1/order/91af9944-e3de-47b3/status')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{
            
                   
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   
    
                   done();
                })
        
           })
       
       it('/PATH order status return error that car is not found  ', (done) =>{
        const record = {  
            contact:"jeasal@gmail.comsalvi",
            status:"sold"
                    
                     }
           chai.request(app)
             .patch('/api/v1/order/91af9944-e3de-/status')
             .set('token', userToken)
             .send(record)
             .end((err, res)=>{
            
                
                   
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(401);
                   done();
                })
        
           })
  });
 