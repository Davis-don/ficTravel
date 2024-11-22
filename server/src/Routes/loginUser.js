import express from 'express'
import jwt from 'jsonwebtoken'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

const Routes = express.Router();
const client =new PrismaClient()

const loginUser= Routes.post('/auth/login',async (req,res)=>{
    try{
      const {inputName,password} = req.body; 
      const user = await client.user.findFirst({
        where:{
          OR:[
            {userName:inputName},
            {email:inputName}
          ]
        }
      })
      

      if(!user){
        
        res.status(401).json({message:"wrong email adress or password"});
        return;
      }
    
      //if user exist check password
       const passwordMatch = await bcrypt.compare(password,user.password);
  
       if(!passwordMatch){
        res.status(401).json({message:"wrong email adress or password"});
        return;
       }
       //generate web token
       const token = jwt.sign(user.id,process.env.SECRET_KET);
       //send token to client && restrict data here to send to client
       res.status(200).json({authToken:token,user})
    }
    catch(e){
    res.status(500).json({message:"login error"})
    }
  })

export default loginUser