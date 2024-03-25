import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";

type PostInputs = {
  title: string;
  description: string;
  user_id: string;
  tags: string[];
  files: Express.Multer.File[];
};

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
    const postId = req.params.id;

    const post = await Post.getPostById(postId);

    return res.status(200).json({ success: true, data: post });
  } catch (error: any) {
    console.error("Error in getPost", error);
    if (error.message === "Post does not exist") {
      return res.status(404).json({ success: false, error: "Post not found" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, user_id, tags } = req.body;
    // const userId = req.body.user.id;
    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : [];
    const inputs: PostInputs = { title, description, user_id, tags, files };
    await Post.createPost(inputs);
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error("Error in createPost", error);
    if (error === "Post not found") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    try {
      await Post.deletePostById(postId);
      res.status(200).json("Post has been deleted!");
    } catch (error) {
      res.status(403).json("You can delete only your posts");
    }
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const { title, description, tags } = req.body;
      const postId = req.params.id;

      const result = await Post.updatePost(
          title,
          description,
          postId,
          tags,
      );

      if (result.success) {
          res.status(200).json({ message: "Post updated successfully!" });
      } else {
          res.status(400).json({ message: "Failed to update post." });
      }
  } catch (error) {
      console.error("Error in updatePost controller:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};


export const getAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.getAuthors();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in getAuthors", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getUsersPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.id;
    const userPosts = await Post.getUsersPost(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error in getUsersPost", error);
    next(error);
  }
};
