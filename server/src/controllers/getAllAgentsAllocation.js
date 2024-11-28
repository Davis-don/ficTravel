import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

/**
 * Function to get all agents and their allocation times from the booking table
 * @returns {Promise<Array>} Array of agent allocations with agentId, startDate, and endDate
 */
async function getAgentsAllocations() {
  try {
    // Query the booking table for agent allocations
    const agentsAllocations = await client.booking.findMany({
      where: {
        agentId: {
          not: null, // Only fetch bookings where an agent is assigned
        },
      },
      select: {
        agentId: true, // Select the agentId
        startDate: true, // Select the startDate of the booking
        endDate: true, // Select the endDate of the booking
      },
    });

    // Return the fetched data
    return agentsAllocations;
  } catch (error) {
    console.error('Error fetching agent allocations:', error);
    throw new Error('Failed to fetch agent allocations');
  }
}

export default getAgentsAllocations;
