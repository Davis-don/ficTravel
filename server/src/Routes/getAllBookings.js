import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch all bookings from the database
const getAllBookings = Routes.get('/get-all-bookings', async (req, res) => {
  try {
    const bookings = await client.booking.findMany({
      include: {
        user: { select: { fullName: true, email: true } }, // Include user details
        agent: { select: { fullName: true, email: true } }, // Include agent details
      },
    });

    // Check if bookings exist
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch bookings" });
  }
});

export default getAllBookings;
