import express from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'


const Route = express.Router();

const client = new PrismaClient()

const newUser = Route.post("/create-account", async (req, res) => {
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

  export default newUser