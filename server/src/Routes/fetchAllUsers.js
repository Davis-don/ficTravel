import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch all users with role = USER
const fetchAllUsersWithRoleUser = Routes.get('/get-all-users', async (req, res) => {
  try {
    const users = await client.user.findMany({
      where: { role: 'USER' }, // Filter for users with role = USER
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }, // Select only the fields you need
    });

    // Check if users exist
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with role USER" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch users" });
  }
});

export default fetchAllUsersWithRoleUser;
