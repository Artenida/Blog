import { NextFunction, Request, Response } from "express";
import { Tags } from "../models/Tags";

export const getTags = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tags = await Tags.getTags();
      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error("Error in getTags", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };