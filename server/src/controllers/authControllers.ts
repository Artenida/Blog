import { Request, Response, NextFunction } from "express";
import { db } from "../config";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
// import bcrypt from 'bcryptjs';

export const register = async (
  req: Request,
  res: Response
) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const checkQuery =
      "SELECT * FROM users WHERE `username` = ? OR `email` = ?";
    db.query(checkQuery, [req.body.username, req.body.email], (error, data) => {
      if (error) {
        return error;
      }
      if (data.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        // const salt = bcrypt.genSaltSync(10)
        // const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        // const hashedPassword = bcrypt.hashSync(password,10);
        const insertQuery =
          "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, req.body.password];
        db.query(insertQuery, values, (error) => {
          if (error) {
            return error;
          }
          return res.status(201).json("User has been created");
        });
      }
    });
  } catch (error) {
    return error;
  }
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (error, data) => {
      console.log(data);
      if (error) return error;

      if (data.length === 0) {
        return res.status(401).json({ message: "Wrong username or password" });
      }
      const user = data[0];
      // const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
      // if (!process.env.JWT_SECRET) {
      //   return res.status(500).json("JWT secret key is not provided");
      // }
      const token = jwt.sign(
        {
          userId: user.id,
        },
        "",
        { algorithm: "none" }
      );

      const { password: pass, ...rest } = user;

      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "Sign in successfully",
        user: rest,
      });
    });
  } catch (error) {
    return error;
  }
};

export const logout = (req: Request, res: Response): void => {
  // Your code for logout endpoint
};
