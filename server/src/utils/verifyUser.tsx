import jwt from 'jsonwebtoken'
import { errorHandler } from './error'
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    
}