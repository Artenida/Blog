import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../utils/error";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await User.findByUsername(req.body.username) as User[];
    if (existingUser.length > 0) {
      const customError = new CustomError(409, "User already exists");
      return next(customError);
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const success = await User.createUser(req.body.username, req.body.email, hash);
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
    const userData: any[] = await User.findByUsername(req.body.username);
    if (userData.length === 0) {
      const customError = new CustomError(400, "User not found");
      return next(customError);
    }
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData[0].password)

    if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

    const token = jwt.sign({id: userData[0].id}, process.env.ACCESS_TOKEN_SECRET as Secret);

    const { password: pass, ...rest } = userData[0];

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({
      message: "Sign in successfully",
      user: rest,
    });
  } catch (error) {
    return next(error);
  }
};
