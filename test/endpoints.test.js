import chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../server';

 chai.should();
 let token;
 chai.use(chaiHttp);


 describe('get all ads posts ', () => {

	before((done)=>{
		const adminInfo = {
			email: "salviosage@gmail.com",
			password: "121621454655"
        }
        const userInfo = {
			email: "jeasal@gmail.com",
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
	
	})

	it('/GET /cars', (done) =>{
	 chai.request(app)
		 .get('/api/v1/cars')
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

 describe('get a specific car  record', ()=>{
   it('/GET /meetups/<car ad id >', (done)=>{

            chai.request(app)
			   .get('/api/v1/cars/ffdfzfzef5f5zef54e')
			   .set('Authorization', adminToken)
               .end((err, res)=>{
               	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id').eql(1);
                res.body.data[0].should.have.property('topic').eql('Electric vehicles');
                res.body.data[0].should.have.property('location').eql('Kicukiro');
                res.body.data[0].should.have.property('happeningon').eql('December 12, 2019');
                res.body.data[0].should.have.property('tags');
                done();
               })

   });

});

 describe('Create A meetup Record', ()=>{
 	it('/POST /meetups', (done)=>{
 		const record = {
            topic: "Electronic Values",
            location: "kacyiru",
            happeningOn: "December 30, 2019",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('createdon');
                res.body.data[0].should.have.property('topic').eql('Electronic Values');
                res.body.data[0].should.have.property('location').eql('kacyiru');
                res.body.data[0].should.have.property('happeningon').eql('December 30, 2019');
                res.body.data[0].should.have.property('tags');
                done();
 		    })
 	})

 	it('it should not post a meetup --when topic is not included ', (done)=>{
 		const record = {
            location: "kacyiru",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	it('it should not post a meetup --when topic or title is a not a string or topic is not at minimum 4 characters', (done)=>{
 		const record = {
 			topic: 1,
            location: "kacyiru",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



 	it('it should not post a meetup --when location is not defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	it('it should not post a meetup --when location is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 1,
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
			 .set('Authorization', token)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});

   
   it('it should not post a meetup --when happeningOn is not defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			.send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



   it('it should not post a meetup --when happeningOn is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: 12/30/2018,
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



   it('it should not post a meetup --when location is not a defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: "December 30, 2018"
            
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


   it('it should not post a meetup --when tags is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: "December 30, 2018",
            tags:2
 		}

 		chai.request(app)
			 .post('/api/v1/meetups')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	
 });


 describe('Fetch all upcoming meetups', ()=>{
 	it('/GET /meetup/upcoming', (done)=>{
          const record = {
            topic: "Electronic Values",
            location: "kacyiru",
            happeningOn: "December 30, 2019",
            tags:"#Electronic #valves"
 		}

        chai.request(app)
			 .get('/api/v1/meetup/upcoming')
			 .set('Authorization', token)
             .end((err, res)=>{

             	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id').eql(1);
                res.body.data[0].should.have.property('createdon');
                res.body.data[0].should.have.property('topic').eql('Electric vehicles');
                res.body.data[0].should.have.property('location').eql('Kicukiro');
                res.body.data[0].should.have.property('happeningon').eql('December 12, 2019');
                res.body.data[0].should.have.property('tags');
                done();
             })



 	})
 });


 


 describe('increasing a vote by 1 on a specific meetup', ()=>{
 	it('/PATCH /questions/1/upvote', (done)=>{
 		

 		chai.request(app)
			 .patch('/api/v1/questions/4/upvote')
			 .set('Authorization', token)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('body').eql('we are in the future now...');
                res.body.data[0].should.have.property('title').eql('why electric cars?');
                res.body.data[0].should.have.property('upvotes').eql(1);
                done();
 		    })
 	})
 });



 describe('Decreasing a vote by 1 on a specific meetup', ()=>{
 	it('/PATCH /questions/1/downvote', (done)=>{
          
          chai.request(app)
			 .patch('/api/v1/questions/4/downvote')
			 .set('Authorization', token)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('body').eql('we are in the future now...');
                res.body.data[0].should.have.property('title').eql('why electric cars?');
                res.body.data[0].should.have.property('downvotes').eql(1);
                done();
 		    });
 	})
 });


 describe('Respond to meetup RSVP', ()=>{
 	it('/POST /meetups/1/rsvps', (done)=>{

 		  const record = {
 		  	status: "yes"
 		  }
          
          chai.request(app)
			 .post('/api/v1/meetups/1/rsvps')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
				 console.log(token);
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('status').eql('yes');
                
                done();
 		    });
 	})

 	it('Can not respond to meetup RSVP -- when status value is different from yes, no, or maybe', (done)=>{

 		  const record = {
 		  	status:"1"
 		  }
          
          chai.request(app)
			 .post('/api/v1/meetups/1/rsvps')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                
                done();
 		    });
 	})
 });


 describe('Creating a question for a specific meetup', ()=>{

 	it('/POST /questions', (done)=>{

 		const record = {
 			title : "Future Economics",
 			body : "How Will It Look like"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups/1/questions')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('title').eql('Future Economics');
                res.body.data[0].should.have.property('body').eql('How Will It Look like');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('createdby').eql(1);

                done();
 		    })

 	})


 	it('can not post a question when title is not defined', (done)=>{

 		const record = {
 			body : "How Will It Look like"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups/1/questions')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});


 	it('can not post a question when title is not a string or at minimum 4 characters', (done)=>{

 		const record = {
 			title : 1,
 			body : "How Will It Look like"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups/1/questions')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});


 	it('can not post a question when body is not defined', (done)=>{

 		const record = {
 			title : "Future Economics"
 		}

 		chai.request(app)
			 .post('/api/v1/meetups/1/questions')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});

   it('can not post a question when body is not a string or at minimum 4 characters', (done)=>{

 		const record = {
 			title : "Future Economics",
 			body : 2
 		}

 		chai.request(app)
			 .post('/api/v1/meetups/1/questions')
			 .set('Authorization', token)
			 .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});

 })