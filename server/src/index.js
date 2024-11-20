import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app = express();
const client = new PrismaClient();

app.use(express.json()); // To parse incoming JSON requests


//cors
app.use(cors({
  origin:"http://localhost:5173",
  methods:["POST", "GET", "PATCH", "PUT", "DELETE"]
}))
// Create Account Route
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
      // Check for an existing user with the same username and email in parallel
      const [existingUserUsername, existingUserEmail] = await Promise.all([
        client.user.findUnique({ where: { userName: userName } }),
        client.user.findUnique({ where: { email: email } }),
      ]);

      if (existingUserUsername) {
        return res.status(409).json({ message: "User with similar username exists" });
      }

      if (existingUserEmail) {
        return res.status(409).json({ message: "User with similar email exists" });
      }

      // Proceed to add the new user if no conflicts were found
      const newUser = await client.user.create({
        data: {
          fullName,
          userName,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json(newUser); 
    } catch (e) {
      console.error(e); 
      res.status(500).json({ message: e.message });
    }
  } catch (e) {
    // If the body parsing or any other part fails
    console.error("Error in create-account route:", e);
    res.status(500).json({ message: "Something went wrong!" });
  }
});


////login here
app.post('/auth/login',async (req,res)=>{
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
    
    console.log(user)
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

// Server listen
app.listen(4000, () => {
  console.log("Server running at port 4000");
});
