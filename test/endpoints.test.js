import chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';

 chai.should();
 let token;
 chai.use(chaiHttp);


 describe('get all ads posts  by admin', () => {

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
			adminToken = res.body.data[0].token;
			console.log(token);
			done();
        })
        chai.request(app)
		.post('/api/v1/auth/login')
		.send(userInfo)
		.end((err, res)=>{
			userToken = res.body.data[0].token;
			console.log(token);
			done();
        })
        chai.request(app)
		.post('/api/v1/auth/login')
		.send(ownerInfo)
		.end((err, res)=>{
			ownerToken = res.body.data[0].token;
			console.log(token);
			done();
		})
	
	})

	it('/GET /cars', (done) =>{
	 chai.request(app)
		 .get('/api/v1/car')
		 .set('Authorization', adminToken)
		 .end((err, res)=>{
			console.log(token);
			res.body.should.be.a('object');
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
 
  });
  describe('get all  your adds and available ads by user who is not admin', () => {


	it('/GET /cars', (done) =>{
	 chai.request(app)
		 .get('/api/v1/car')
		 .set('Authorization', ownerToken)
		 .end((err, res)=>{
			console.log(token);
			res.body.should.be.a('object');
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
 
  });

 describe('get a specific car  record', ()=>{
   
   it('/GET /car/<car ad id >', (done)=>{

            chai.request(app)
            .set('Authorization', ownerToken)
			   .get('/api/v1/car/ffdfzfzef5f5zef54e')
			   .set('Authorization', userToken)
               .end((err, res)=>{
                   res.body.should.be.a('object');
                   res.body.should.have.property('status').eql(200);
                   res.body.should.have.property('data');
                   res.body.data.should.be.a('array');
                   res.body.data[0].should.have.property('id').eql('ffdfzfzef5f5zef54e');
                   res.body.data[0].should.have.property('owner').eql('jeasal@gmail.com');
                   res.body.data[0].should.have.property('state').eql('new');
                   res.body.data[0].should.have.property('status').eql('available');
                   res.body.data[0].should.have.property('body_type').eql('truc');
                   res.body.data[0].should.have.property('model').eql('benz');
                   res.body.data[0].should.have.property('manufacturer').eql('mercedes');
                   res.body.data[0].should.have.property('price').eql('1215144');
                   res.body.data[0].should.have.property('created_on').eql('12/12/2018');
                   res.body.data[0].should.have.property('modified_on').eql('112/12/2018');
                   done();
                
               })

   });

});

 describe('Create A car ad', ()=>{
 	it('/POST /car', (done)=>{
 		const record = {  
        owner :"sagesalvi.comsalvi",
        state:"used",
        body_type :"truc",
        model :"benz",
        manufacturer :"mercedes",
        price :"5144",
        
 		}

 		chai.request(app)
			 .post('/api/v1/car')
			 .set('Authorization', userToken)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('owner').eql('sagesalvi@com.salvi');
                res.body.data[0].should.have.property('state').eql('used');
                res.body.data[0].should.have.property('status').eql('available');
                res.body.data[0].should.have.property('body_type').eql('truc');
                res.body.data[0].should.have.property('model').eql('benz');
                res.body.data[0].should.have.property('manufacturer').eql('mercedes');
                res.body.data[0].should.have.property('price').eql("5144");
                res.body.data[0].should.have.property('created_on');
                res.body.data[0].should.have.property('modified_on');
                done();
              
 		    })
 	})

 	it('it should create an order for a specific available car ', (done)=>{
 		const record = {
        contacts: "salviosage@gmail.com",
        car_id: "ffdfzfzef5f5zef54e",
        amount:"11515555",
 		}

 		chai.request(app)
			 .post('/api/v1/order')
			 .set('Authorization', userToken)
			 .send(record)
 		    .end((err, res)=>{
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('contacts').eql('salviosage@gmail.com');
                res.body.data[0].should.have.property('car_id').eql('ffdfzfzef5f5zef54e');
                res.body.data[0].should.have.property('amount').eql('11515555');
                res.body.data[0].should.have.property('status').eql('pending');
                res.body.data[0].should.have.property('created_on');
                res.body.data[0].should.have.property('modified_on');
                done();
             
            })

 	});


 	it('it should not post an  order while the car is not available or not exiist ', (done)=>{
        const record = {
            contacts: "salviosage@gmail.com",
            car_id: "ffdfzfzef5f5zef5",
            amount:"11515555",
             }

             .post('/api/v1/order')
			 .set('Authorization', userToken)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



 