import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
import createDatabaseConnection from "../config";
import mysql from "mysql";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    const customError = new CustomError(400, "All fields are required");
    return next(customError);
  }

  const dbConnection = createDatabaseConnection();
  const connection = dbConnection.getConnection();

  try {
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    const data = await queryAsync(connection, checkQuery, [req.body.username]);

    if (data.length > 0) {
      dbConnection.closeConnection();
      const customError = new CustomError(409, "User already exists");
      return next(customError);
    } else {
      const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      await queryAsync(connection, insertQuery, [username, email, password]);
      dbConnection.closeConnection();
      return res.status(201).json("User has been created");
    }
  } catch (error) {
    dbConnection.closeConnection();
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const customError = new CustomError(400, "All fields are required");
    return next(customError);
  }

  const dbConnection = createDatabaseConnection();
  const connection = dbConnection.getConnection();

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const data = await queryAsync(connection, query, [username]);

    if (data.length === 0) {
      dbConnection.closeConnection(); 
      const customError = new CustomError(400, "Wrong username or password");
      return next(customError);
    }

    const user = data[0];

    if (password !== user.password) {
      dbConnection.closeConnection(); 
      const customError = new CustomError(400, "Wrong password");
      return next(customError);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      dbConnection.closeConnection(); 
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

    dbConnection.closeConnection(); 
  } catch (error) {
    dbConnection.closeConnection();
    return next(error);
  }
};

async function queryAsync(connection: mysql.Connection, query: string, values: any[]): Promise<any[]> {
  return new Promise<any[]>((resolve, reject) => {
    connection.query(query, values, (error: mysql.MysqlError | null, results: any[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}