import { Request, Response, NextFunction } from "express";
import { db } from "../config";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
// import errorHandler from "../middleware/userMiddlewares";
// import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, confirmPassword } = req.body;
  // console.log(req.body);
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json("All fields are required");
  }
  try {
    // Check if user exists
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkQuery, [req.body.username], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length > 0) {
        const customError = new CustomError(409, 'User already exists');
        return next(customError);
      } else {
        // Create a new user
          // const hashedPassword = bcrypt.hashSync(password,10);
        const insertQuery =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, req.body.password];
        db.query(insertQuery, values, (error) => {
          if (error) {
            return next(error)
          }
          return res.status(201).json("User has been created");
        });
      }
    });
  } catch (error) {
    return next(error);  
  }
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [req.body.username], (err, data) => {
      console.log(data);
      if (err) return res.status(500).json(err);

      if (data.length === 0) {
        return res.status(400).json("Wrong username or password");
      }
      const user = data[0]; // Assuming the first row is the user

      if (password !== user.password) {
        return res.status(400).json("Wrong username or password");
      }
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
    return res.status(500).json(error);
  }
};

export const logout = (req: Request, res: Response): void => {
  // Your code for logout endpoint
};
