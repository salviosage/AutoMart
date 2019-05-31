const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const mart =require('../db/automart')
 
class User{
    constructor(){
    
    }


    signup (req, res)  {
        bcrypt.hash(req.body.password, 10).then(
          (hash) => {
            let newUser ={
              id: mart.users.length + 1,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              location: req.body.location,
              password: hash
            };
           
        });
        if(req.body.isadmin == true) {
          role = 'admin';
       } else  {
           role = 'user';
       }
            mart.users.push(newUser).then(
              (newuser) => {
                const token = jwt.sign(
                  { userId: user.id ,role: role },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' });
                res.status(201).json({
                  token,
                  message: 'User added successfully!',
                  newUser
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                    status:500,
                  error: error
                });
              }
            );
          };
     

      login (req, res, next)  {
       
        mart.users.find(user => mart.users.email === req.body.email).then(
          (user) => {
            if (!user) {
              return res.status(401).json({
                error: new Error('User not found!')
              });
            }
            bcrypt.compare(req.body.password, user.password).then(
              (valid) => {
                if (!valid) {
                  return res.status(401).json({
                    error: new Error('Incorrect password!')
                  });
                }
                if(req.body.isadmin == true) {
                  role = 'admin';
               } else  {
                   role = 'user';
               }
                const token = jwt.sign(
                  { userId: user.id ,role: role },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' });
                res.status(200).json({
                  token: token,
                  user
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
        find( id) {return mart.users.find(user => user.id === id);}
}



  