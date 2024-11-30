import express from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

const Route = express.Router();

const client =new PrismaClient()

const newUser = Route.post("/create-account", async (req, res) => {
  try {
    const { fullName, userName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    // Validate the role against allowed values
    const allowedRoles = ["ADMIN", "USER", "AGENT"];
    const validatedRole = allowedRoles.includes(role?.toUpperCase()) ? role.toUpperCase() : "USER";

    try {
      // Check for an existing user with the same username and email in parallel
      const [existingUserUsername, existingUserEmail] = await Promise.all([
        client.user.findUnique({ where: { userName } }),
        client.user.findUnique({ where: { email } }),
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
          role: validatedRole, // Include the role field
        },
      });

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          userName: newUser.userName,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } catch (e) {
    console.error("Error in create-account route:", e);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export default newUser;
