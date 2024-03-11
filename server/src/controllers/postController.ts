import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import Post from "../models/Post";

export const getPosts = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const posts = await Post.getPosts();
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        console.error("Error in getPosts", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
}

export const getPost = (req: Request,
    res: Response,
    next: NextFunction) => {
    res.json("from controller")
}

export const addPost = (req: Request,
    res: Response,
    next: NextFunction) => {
    res.json("from controller")
}

export const deletePost = (req: Request,
    res: Response,
    next: NextFunction) => {
    res.json("from controller")
}

export const updatePost = (req: Request,
    res: Response,
    next: NextFunction) => {
    res.json("from controller")
}

