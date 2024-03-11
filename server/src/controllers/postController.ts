import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import Post from "../models/Post";
import createDatabaseConnection from "../config";

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

export const getSinglePost = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            const postId = parseInt(req.params.id); // Assuming the post ID is passed in the URL params
            const userId = parseInt(req.params.userId); // Assuming the user ID is passed in the URL params
        
            const post = await Post.getPostById(postId, userId);
        
            if (!post) {
              return res.status(404).json({ success: false, error: "Post not found" });
            }
        
            return res.status(200).json({ success: true, data: post });
          } catch (error) {
            console.error("Error in getPost", error);
            res.status(500).json({ success: false, error: "Internal server error" });
          }
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

