const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const mart =require('../db/automart')
 
class User{
    constructor(){
    
    }


    getUsers(req, res) {
      let users = mart.users;
      res.send(users);
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
              isAdmin:req.body.isAdmin,
              password: hash
            };
            if(req.body.isadmin == true) {
                newUser.role = 'admin';
            } else  {
                ewUser.role = 'normal';
            }
        });
        const token = jwt.sign(
          { userId: user.id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' });
            mart.users.push(newUser).then(
              (data) => {
                res.status(201).json({
                 token ,
                  data
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
        let isUserExist = mart.users.find((user) => user.email == reqemail);
        mart.users.find( req.body.email ).then(
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
                const token = jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' });
                res.status(200).json({
                  
                  token: token,
                  user
                
                });
                console.log(user)
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
        find( email) {return mart.users.find(user => user.id === id);}

        login (req, res, next)  {
        let isUserExist = mart.users.find((user) => user.email == reqemail);
        mart.users.find( req.body.email ).then(
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
                const token = jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' });
                res.status(200).json({
                  
                  token: token,
                  user
                
                });
                console.log(user)
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
}



  