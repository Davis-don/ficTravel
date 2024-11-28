import express from 'express';
import { PrismaClient } from '@prisma/client';
import allocateNow from '../controllers/allocateNow.js';

const Route = express.Router();
const client = new PrismaClient();

// POST request for creating a new booking
const newBookingRequest = Route.post('/book-request', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { userId, startDate, endDate, guest, attractionName, bookingPrice, paidAmount } = req.body;

    // Validate if required fields are provided
    if (!userId || !startDate || !endDate || !guest || !attractionName || bookingPrice === undefined || paidAmount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Allocate agentId using allocateNow function
    const agentId = await allocateNow();

    // Check if the user with the provided userId exists
    const userExists = await client.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    // If no agent is available for allocation, return an error
    if (!agentId) {
      return res.status(400).json({ message: 'No available agent for allocation' });
    }

    // Create a new booking in the database
    const newBooking = await client.booking.create({
      data: {
        fullName: userExists.fullName || '', // Optional: Use user full name if available
        startDate: new Date(startDate), // Ensure startDate is a Date object
        endDate: new Date(endDate), // Ensure endDate is a Date object
        numberOfGuests: parseInt(guest), // Number of guests
        attractionName: attractionName, // Include the attractionName in the data
        bookingPrice: parseFloat(bookingPrice), // Save booking price
        paidAmount: parseFloat(paidAmount), // Save paid amount
        userId: userId, // User ID
        agentId: agentId, // Use the allocated agentId
      },
    });

    // Return the created booking as a response
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
});

export default newBookingRequest;



// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import allocateNow from '../controllers/allocateNow.js';

// const Route = express.Router();
// const client = new PrismaClient();

// // POST request for creating a new booking
// const newBookingRequest = Route.post('/book-request', async (req, res) => {
//   try {
//     // Destructure the data from the request body
//     const { userId, startDate, endDate, guest, attractionName } = req.body;

//     // Validate if required fields are provided
//     if (!userId || !startDate || !endDate || !guest || !attractionName) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Allocate agentId using allocateNow function
//     const agentId = await allocateNow();

//     // Check if the user with the provided userId exists
//     const userExists = await client.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userExists) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // If no agent is available for allocation, return an error
//     if (!agentId) {
//       return res.status(400).json({ message: 'No available agent for allocation' });
//     }

//     // Create a new booking in the database
//     const newBooking = await client.booking.create({
//       data: {
//         fullName: '', // Assuming fullName will be provided in the future or another field to capture this.
//         startDate: new Date(startDate), // Ensure startDate is a Date object
//         endDate: new Date(endDate), // Ensure endDate is a Date object
//         numberOfGuests: parseInt(guest), // Number of guests
//         attractionName: attractionName, // Include the attractionName in the data
//         userId: userId, // User ID
//         agentId: agentId, // Use the allocated agentId
//       },
//     });

//     // Return the created booking as a response
//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ message: 'Something went wrong!', error: error.message });
//   }
// });

// export default newBookingRequest;


