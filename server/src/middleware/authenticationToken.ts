
import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "",
    (error: VerifyErrors | null, userInfo: any) => {
      if (error || !userInfo)
        return res.status(403).json("Token is not valid");

      req.body.user = userInfo;
      next();
    }
  );
};