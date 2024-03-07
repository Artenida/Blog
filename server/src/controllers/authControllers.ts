import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
import databaseConnection from "../config";
// import bcrypt from 'bcryptjs';

export const register = (req: Request, res: Response, next: NextFunction) => {
  const connection = databaseConnection;
  const db = connection.getConnection();

  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    const customError = new CustomError(400, "All fields are required");
    return next(customError);
  }
  try {
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkQuery, [req.body.username], (error, data) => {
      if (error) {
        connection.closeConnection();
        return next(error);
      }
      if (data.length > 0) {
        connection.closeConnection();
        const customError = new CustomError(409, "User already exists");
        return next(customError);
      } else {
        // const hashedPassword = bcrypt.hashSync(password,10);
        const insertQuery =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, req.body.password];
        db.query(insertQuery, values, (error) => {
          connection.closeConnection();
          if (error) {
            return next(error);
          }
          return res.status(201).json("User has been created");
        });
      }
    });
  } catch (error) {
    connection.closeConnection();
    return next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const connection = databaseConnection;
  const db = connection.getConnection();

  const { username, password } = req.body;
  if (!username || !password) {
    const customError = new CustomError(400, "All fields are required");
    return next(customError);
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [req.body.username], (error, data) => {
      if (error) {
        connection.closeConnection(); 
        return next(error);
      }

      if (data.length === 0) {
        connection.closeConnection(); 
        const customError = new CustomError(400, "Wrong username or password");
        return next(customError);
      }

      const user = data[0];

      if (password !== user.password) {
        connection.closeConnection(); 
        const customError = new CustomError(400, "Wrong password");
        return next(customError);
      }

      if (!process.env.ACCESS_TOKEN_SECRET) {
        connection.closeConnection(); 
        return res.status(500).json("JWT secret key is not provided");
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      const { password: pass, ...rest } = user;

      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "Sign in successfully",
        user: rest,
      });

      connection.closeConnection(); 
    });
  } catch (error) {
    connection.closeConnection();
    return next(error);
  }
};
