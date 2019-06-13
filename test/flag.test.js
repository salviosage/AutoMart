import  chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';
 

 chai.should();
  let userToken,adminToken,ownerToken;
 chai.use(chaiHttp);


 describe('creating ad order  ', () => {

	before((done)=>{
		
        const userInfo = {
			email: "sagesalvi@com.salvi",
			password: "1216214546155"
		}
       
       
    chai.request(app)
        .post('/api/v1/auth/login')
      
        .send(userInfo)
        .end((err, res)=>{
            
            userToken = res.body.token;
            
            done();
        })
	
    })
  
   
    

it('/PUT /FLAG ', (done) =>{
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
			
			done();
		 })
 
    })
   

   
   
       it('return an error user is trying to flag a post which is not available  ', (done) =>{
        const record = {  
            contact:"jeasal@gmail.com",
            car_id:"ffdfzfzef5f5zef54e",
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
                   
    
                   done();
                })
        
           })
       
      
  });