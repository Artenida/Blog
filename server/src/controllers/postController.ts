import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import Post from "../models/Post";
import createDatabaseConnection from "../config";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.getPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in getPosts", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);

    const post = await Post.getPostById(postId, userId);

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error in getPost", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image, title, description, createdAt } = req.body;
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      async (error: jwt.VerifyErrors | null, userInfo: any) => {
        if (error || !userInfo)
          return res.status(403).json("Token is not valid");

        try {
          await Post.createPost(image, title, description, createdAt, userInfo.id);
          res.status(200).json("Post created successfully!");
        } catch (error) {
          res.status(500).json("Internal server error");
        }
      }
    );
  } catch (error) {
    next(error);
  }
};


export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.id);
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      async (error: VerifyErrors | null, userInfo: any) => {
        if (error || !userInfo)
          return res.status(403).json("Token is not valid");

        try {
          await Post.deletePostById(postId, userInfo.id);
          res.status(200).json("Post has been deleted!");
        } catch (error) {
          res.status(403).json("You can delete only your posts");
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image, title, description } = req.body;
    const postId = parseInt(req.params.id);
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      async (error: jwt.VerifyErrors | null, userInfo: any) => {
        if (error || !userInfo)
          return res.status(403).json("Token is not valid");

        try {
          await Post.updatePost(image, title, description, postId, userInfo.id);
          res.status(200).json("Post updated successfully!");
        } catch (error) {
          res.status(500).json("Internal server error");
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
