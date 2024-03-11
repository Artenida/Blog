import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
import databaseConnection from "../config";
import createDatabaseConnection from "../config";
import {
  validateLogin,
  validateRegistration,
} from "../middleware/validationMiddleware";
import { User } from "../models/User";
// import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await User.findByUsername(req.body.username) as User[];
    if (existingUser.length > 0) {
      const customError = new CustomError(409, "User already exists");
      return next(customError);
    } else {
      const success = await User.createUser(req.body.username, req.body.email, req.body.password);
      if (success) {
        return res.status(201).json("User has been created");
      } else {
        return res.status(400).json("Failed to create user");
      }
    }
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const userData: any[] = await User.findByUsername(req.body.username);

    if (userData.length === 0) {
      const customError = new CustomError(400, "Wrong username or password");
      return next(customError);
    }

    const user = userData[0];

    if (password !== user.password) {
      const customError = new CustomError(400, "Wrong password");
      return next(customError);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.status(500).json("JWT secret key is not provided");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    const { password: pass, ...rest } = user;

    // res.cookie("token", token, {
    //   httpOnly: true,
    // });
    res.status(200).json({
      message: "Sign in successfully",
      user: rest,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};
