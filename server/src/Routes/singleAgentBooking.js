import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch all bookings for a single agent (using agentId from URL params)
const singleAgentBooking = Routes.get('/get-agent-bookings/:agentId', async (req, res) => {
  const agentId = req.params.agentId;

  // Validate agentId
  if (!agentId) {
    return res.status(400).json({ message: "Agent ID is required" });
  }

  try {
    // Fetch bookings for a specific agent, including the user fullName and email
    const bookings = await client.booking.findMany({
      where: { agentId: parseInt(agentId, 10) },
      include: {
        user: {
          select: {
            fullName: true, // Include the user's full name
            email: true,    // Include the user's email
          }
        },
      },
    });

    // Check if bookings exist
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this agent" });
    }

    // Send bookings as the response
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch bookings" });
  }
});

export default singleAgentBooking;

