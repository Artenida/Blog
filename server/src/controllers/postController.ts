import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import { Tags } from "../models/Tags";

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
    const { image, title, description, createdAt, tags } = req.body;
    const userId = req.body.user.id;
    await Post.createPost(image, title, description, createdAt, userId, tags);

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
    const postId = parseInt(req.params.id);
    try {
      const checkPostExists = await Post.checkPostExists(postId);
      if (!checkPostExists) {
        return res.status(404).json("Post not found");
      }
      await Post.deletePostById(postId, req.body.user.id);
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
    const { image, title, description } = req.body;
    const postId = parseInt(req.params.id);

    try {
      const checkPostExists = await Post.checkPostExists(postId);
      if (!checkPostExists) {
        return res.status(404).json("Post not found!");
      }
      await Post.updatePost(
        image,
        title,
        description,
        postId,
        req.body.user.id
      );
      res.status(200).json("Post updated successfully!");
    } catch (error) {
      res.status(500).json("You can update only your posts");
    }
  } catch (error) {
    next(error);
  }
};

export const getUsersPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const userPosts = await Post.getUsersPost(userId);
    res.status(200).json(userPosts);   
  }  catch (error) {
    console.error("Error in getUsersPost", error);
    next(error)
  }
};