import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../controllers/JwtMiddleWear.js';

const Routes = express.Router();
const client = new PrismaClient();

// Get a single user by ID
Routes.get('/get-single-user', jwtMiddleware, async (req, res) => {
    const userId = req.userId;

  // Validate ID
  if (!userId) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    // Fetch user from the database
    const user = await client.user.findFirst({
      where: { id: parseInt(userId, 10) },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user as response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not query user" });
  }
});

export default Routes;
