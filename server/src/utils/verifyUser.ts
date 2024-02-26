import jwt, { decode } from "jsonwebtoken";
import { errorHandler } from "./error";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
//   console.log(token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, (error, user) => {
    console.log(user);
    if (error) {
      return next("Unauthorized");
    }
    req.body = user;
    // console.log(user);
    next();
  });
};
