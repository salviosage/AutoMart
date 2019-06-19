import  bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';

class Helper  {
  
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }
  
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
  
  
  generateToken(userName,role) {
    const token = jwt.sign(
      { userName:userName,role:role },
      process.env.secret-key,
      { expiresIn: '24h' });

    return token;
  }
}

export default Helper;