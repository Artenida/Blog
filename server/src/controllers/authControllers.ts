import { Request, Response, NextFunction } from "express";
import DatabaseConnection from "../config";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
// import bcrypt from 'bcryptjs'; -> remove

export const register = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = new DatabaseConnection();
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
        return next(error);
      }
      if (data.length > 0) {
        const customError = new CustomError(409, "User already exists");
        return next(customError);
      } else {
        // const hashedPassword = bcrypt.hashSync(password,10);
        const insertQuery =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, req.body.password];
        db.query(insertQuery, values, (error) => {
          if (error) {
            return next(error);
          }
          return res.status(201).json("User has been created");
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const connection = new DatabaseConnection();
  const db = connection.getConnection();
  
  const { username, password } = req.body;

  // use validation middleware and use this function, login, only for login functionality
  if (!username || !password) {
    const customError = new CustomError(400, "All fields are required");
    return next(customError);
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [req.body.username, req.body.password], (error, data) => {
      // console.log(data);
      if (error) return next(error);

      /**
       * DRY (don't repeat yourself) & DIE (dublication is evil)
       * from the 2 condition blocks the only thing that changes is the meesage 
       * "Wrong username or password" & "Wrong password"
       */

      if (data.length === 0) {
        const customError = new CustomError(400, "Wrong username or password");
        return next(customError);
      }
      const user = data[0];

      if (password !== user.password) {
        const customError = new CustomError(400, "Wrong password");
        return next(customError);
      }
      // const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
      
       if (!process.env.ACCESS_TOKEN_SECRET) {
        return res.status(500).json("JWT secret key is not provided");
      }
      const token = jwt.sign({
        userId: user.id,
      }, process.env.ACCESS_TOKEN_SECRET); 
      
      //do not return password back
      const { password: pass, ...rest } =  user;

      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "Sign in successfully",
        user: rest,
      });
    });
  } catch (error) {
    return next(error); 
  }
  connection.closeConnection();
};

/** SOC separate concerns
 * use a repo or model for queries
 * that will make it easier to change from query to orm, or change database to no-sql
*/