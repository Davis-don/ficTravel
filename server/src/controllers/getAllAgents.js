import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

/**
 * Function to get all users with the role 'AGENT'
 * @returns {Promise<Array>} Array of agents with their details
 */
async function getAllAgents() {
  try {
    // Query the User table for all users with the role 'AGENT'
    const agents = await client.user.findMany({
      where: {
        role: 'AGENT', // Use the Role enum to filter for agents
      },
      select: {
        id: true, // Include the user ID
        fullName: true, // Include the full name
        email: true, // Include the user's email
        createdAt: true, // Include the createdAt timestamp
      },
    });

    // Return the fetched agents
    return agents;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw new Error('Failed to fetch agents');
  }
}

export default getAllAgents;

