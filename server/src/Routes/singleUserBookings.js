import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../controllers/JwtMiddleWear.js';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch all bookings for a single user (using userId from URL params)
const singleUserBooking = Routes.get('/get-user-bookings/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const bookings = await client.booking.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        agent: { select: { fullName: true } },
      },
    });

    // Check if bookings exist
    if (bookings.length === 0) {
      return res.status(404).json({ message: "You do not have any bookings" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch bookings" });
  }
});


export default singleUserBooking;


