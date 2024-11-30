import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch all users with role = AGENT
const fetchAllAgents = Routes.get('/get-all-agents', async (req, res) => {
  try {
    // Query the database for users with the 'AGENT' role
    const agents = await client.user.findMany({
      where: { role: 'AGENT' }, // Filter for users with role = AGENT
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }, // Select only the fields you need
    });

    // Check if any agents exist
    if (agents.length === 0) {
      return res.status(404).json({ message: "No agents found" });
    }

    // Return the list of agents as a JSON response
    res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch agents" });
  }
});

export default fetchAllAgents;
