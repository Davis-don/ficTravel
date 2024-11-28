import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // For password hashing

const Routes = express.Router();
const client = new PrismaClient();

const deleteAccountById = Routes.delete('/delete-account/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { confirmation } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Validate the confirmation field
  if (!confirmation) {
    return res.status(400).json({ message: "Confirmation word is required" });
  }

  // Check if the confirmation matches 'delete' (case-insensitive)
  if (confirmation.toLowerCase() !== 'delete') {
    return res.status(400).json({ message: "Please type 'delete' to confirm account deletion" });
  }

  try {
    // Find the user by ID
    const user = await client.user.findUnique({ where: { id: parseInt(userId, 10) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the database
    await client.user.delete({
      where: { id: parseInt(userId, 10) },
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Could not delete account" });
  }
});

export default deleteAccountById;
