import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Function to fetch a single user by ID (using userId from URL params)
const getUserById = Routes.get('/get-user/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await client.user.findUnique({
      where: { id: parseInt(userId, 10) },
      select: {
        id: true,
        fullName: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        bookings: {
          select: {
            id: true,
            fullName: true,
            startDate: true,
            endDate: true,
            numberOfGuests: true,
            dateOfBooking: true,
            attractionName: true,
            agent: { select: { fullName: true } }, // Fetch the agent assigned to this booking
          },
        },
        allocatedBookings: {
          select: {
            id: true,
            fullName: true,
            startDate: true,
            endDate: true,
            numberOfGuests: true,
            dateOfBooking: true,
            attractionName: true,
            user: { select: { fullName: true } }, // Fetch the user associated with this booking
          },
        },
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch user data" });
  }
});

export default getUserById;


