import { NextFunction, Request, Response } from "express";
import DatabaseConnection from "../config";
import jwt from "jsonwebtoken";

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const connection = new DatabaseConnection();
  const db = connection.getConnection();

  db.query("SELECT * FROM data", (error, result) => {
    if (error) {
      return next(error);
    }
    res.json(result);
  });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const connection = new DatabaseConnection();
  const db = connection.getConnection();

  const { username, email, bio } = req.body;
    const { id } = req.params; 
    const query =
      "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
    db.query(query, [username, email, bio, id], (error, result) => {
      if (error) {
        // console.log("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else if(result.changedRows === 0) {
        res.status(404).json({ message: "User not found" });
      }else if (result.changedRows === 1) {
        res.status(200).json({
          message: "User updated successfully",
          user: {
            id: id,
            username: username,
            email: email,
            bio: bio,
          },
        });
      } else {
        res.status(400).json({ message: "Data not updated" });
      }
    });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = new DatabaseConnection();
  const db = connection.getConnection();

  const { id } = req.params; 

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  });
};