import config from '../config/key'
import jwt from 'jsonwebtoken'


export const verifyToken = async(req,res,next)=>{
    const authToken = req.headers['authorization'];
    const token = (authToken && authToken.split(' ')[1]) ?? authToken;
  
    
    await jwt.verify(token,config.secretOrKey,(err,user)=>{
        if(err) return res.status(200).json({"Status":false,"msg":"Authentication Failed",success:'error'})
        else{
  
            return next();
          }
    })
    }