import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

// Route to fetch all testimonials
const fetchAllTestimonials = Routes.get('/get-all-testimonials', async (req, res) => {
  try {
    // Query the database for all testimonials
    const testimonials = await client.testimonial.findMany({
      select: {
        id: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      }, // Select only the fields you need
    });

    // Check if any testimonials exist
    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    // Return the list of testimonials as a JSON response
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Could not fetch testimonials" });
  }
});

export default fetchAllTestimonials;
