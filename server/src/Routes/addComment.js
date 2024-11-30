import express from 'express';
import { PrismaClient } from '@prisma/client';

const Route = express.Router();
const client = new PrismaClient();

// Route to create or update a testimonial
const createOrUpdateTestimonial = Route.post("/create-testimonial", async (req, res) => {
  try {
    const { id, message } = req.body; // Get userId and message from the request body

    // Validate if user exists
    const user = await client.user.findUnique({
      where: { id: parseInt(id, 10) }, // Ensure id is an integer
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a testimonial already exists for the user
    const existingTestimonial = await client.testimonial.findFirst({
      where: { userId: parseInt(id, 10) },
    });

    let responseMessage;
    let testimonialData;

    if (existingTestimonial) {
      // Update the existing testimonial
      const updatedTestimonial = await client.testimonial.update({
        where: { id: existingTestimonial.id },
        data: { comment: message }, // Update the comment with the new message
      });
      responseMessage = "Testimonial updated successfully";
      testimonialData = updatedTestimonial;
    } else {
      // Create a new testimonial
      const newTestimonial = await client.testimonial.create({
        data: {
          userId: parseInt(id, 10), // Ensure userId is an integer
          comment: message, // Use message instead of comment
        },
      });
      responseMessage = "Testimonial created successfully";
      testimonialData = newTestimonial;
    }

    // Respond with success message
    return res.status(201).json({
      message: responseMessage,
      testimonial: {
        id: testimonialData.id,
        userId: testimonialData.userId,
        comment: testimonialData.comment,
        createdAt: testimonialData.createdAt,
      },
    });
  } catch (e) {
    console.error("Error in create-testimonial route:", e);
    return res.status(500).json({ message: "Something went wrong!" });
  } finally {
    await client.$disconnect(); // Properly disconnect Prisma client
  }
});

export default createOrUpdateTestimonial;

