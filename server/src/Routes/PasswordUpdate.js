import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // For password hashing

const Routes = express.Router();
const client = new PrismaClient();

const updatePasswordById = Routes.patch('/update-password/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Validate all password fields
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Current password, new password, and confirmation password are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New password and confirmation password do not match" });
  }

  try {
    // Find the user by ID
    const user = await client.user.findUnique({ where: { id: parseInt(userId, 10) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the current password with the hashed password stored in the database
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updatedUser = await client.user.update({
      where: { id: parseInt(userId, 10) },
      data: { password: hashedNewPassword },
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

    res.status(200).json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Could not update password" });
  }
});

export default updatePasswordById;
