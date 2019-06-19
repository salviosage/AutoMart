import  bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import env from "dotenv"; 
env.config()

const key =process.env.secret_key;
class Helper  {
  
  hashPassword(password) {
    console.log(password)    
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }
  
  comparePassword(hashPassword, password) {
    console.log(hashPassword,password)
    return bcrypt.compareSync(password, hashPassword);
  }
  
  
 generateToken(userName,role) {
    const token = jwt.sign(
      { userName:userName,role:role },
      process.env.secret_key,
      { expiresIn: '24h' });

    return token;
  }
}

export default new Helper();