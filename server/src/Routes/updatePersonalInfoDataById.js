import express from 'express';
import { PrismaClient } from '@prisma/client';

const Routes = express.Router();
const client = new PrismaClient();

const updatePersonalInfoDataById = Routes.patch('/update-user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { fullName, userName, email } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Validate at least one field to update
  if (!fullName && !userName && !email) {
    return res.status(400).json({ message: "At least one field is required to update." });
  }

  try {
    // Check if the email or username already exists
    if (email) {
      const emailExists = await client.user.findUnique({ where: { email } });
      if (emailExists && emailExists.id !== parseInt(userId)) {
        return res.status(400).json({ message: 'This email is already in use by another account.' });
      }
    }

    if (userName) {
      const userNameExists = await client.user.findUnique({ where: { userName } });
      if (userNameExists && userNameExists.id !== parseInt(userId)) {
        return res.status(400).json({ message: 'This username is already in use by another account.' });
      }
    }

    // Build the update data object dynamically
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (userName) updateData.userName = userName;
    if (email) updateData.email = email;

    // Update the user in the database
    const updatedUser = await client.user.update({
      where: { id: parseInt(userId, 10) },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);

    // Handle unique constraint violation (e.g., username or email already exists)
    if (error.code === 'P2002') {
      return res.status(400).json({
        message: `Duplicate value for field: ${error.meta.target.join(', ')}`,
      });
    }

    res.status(500).json({ message: "Could not update user data" });
  }
});

export default updatePersonalInfoDataById;



