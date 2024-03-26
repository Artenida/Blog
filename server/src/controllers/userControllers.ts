import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      const customError = new CustomError(400, "User ID is required");
      return next(customError);
    }

    const userData = await User.getAllUserData(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error retrieving user data", error);
    const customError = new CustomError(500, "Internal Server Error");
    return next(customError);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password, bio } = req.body;
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { success, message } = await User.updateUser(
      id,
      username,
      email,
      hashedPassword,
      bio,
    );

    if (success) {
      res.status(200).json({
        message: message,
        user: {
          id: id,
          username: username,
          email: email,
          bio: bio,
        },
      });
    } else {
      res.status(400).json({ message: message });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const file: Express.Multer.File = req.file as Express.Multer.File;

  try {
    await User.updateProfilePicture(userId, file);
    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(400).json({ message: "Error updating profile picture" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const isDeleted = await User.deleteUser(Number(id));
    if (!isDeleted) {
      const customError = new CustomError(400, "User not found");
      return next(customError);
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    const customError = new CustomError(500, "Internal Server Error");
    return next(customError);
  }
};
