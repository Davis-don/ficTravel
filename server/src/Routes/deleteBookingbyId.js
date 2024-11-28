import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Endpoint to delete a booking by its ID
const deleteBookingById = Routes.delete('/delete-booking/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

  // Validate bookingId
  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  try {
    // Find the booking by ID
    const booking = await client.booking.findUnique({ where: { id: parseInt(bookingId, 10) } });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking from the database
    await client.booking.delete({
      where: { id: parseInt(bookingId, 10) },
    });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Could not delete booking" });
  }
});

export default deleteBookingById;

