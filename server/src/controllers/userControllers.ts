import { NextFunction, Request, Response } from "express";
import DatabaseConnection from "../config";
import { CustomError } from "../utils/error";

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
  connection.closeConnection();
};

export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = new DatabaseConnection();
  const db = connection.getConnection();
  const { username, email, password, bio } = req.body;
  const { id } = req.params;

  const checkQuery =
    "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
  db.query(checkQuery, [username, email, id], (checkError, checkResult) => {
    if (checkError) {
      console.log("Error checking username/email:", checkError);
      res.status(400).json({ message: "Error checking username/email" });
      connection.closeConnection();
      return;
    }

    if (checkResult && checkResult.length > 0) {
      res.status(400).json({ message: "Username or email already exists" });
      connection.closeConnection();
      return;
    }

    let query;
    const queryParams = [];

    // Determine the appropriate update query based on whether password is provided
    if (password) {
      query =
        "UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?";
      queryParams.push(username, email, password, bio, id);
    } else {
      query = "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
      queryParams.push(username, email, bio, id);
    }

    db.query(query, queryParams, (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else if (result.changedRows === 1) {
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
        res.status(404).json({ message: "User not found" });
      }
      connection.closeConnection();
    });
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
      const customError = new CustomError(500, "Internal Server Error");
      return next(customError);
    }

    if (result.affectedRows === 0) {
      const customError = new CustomError(400, "User not found");
      return next(customError);
    }

    return res.status(200).json({ message: "User deleted successfully" });
  });
  connection.closeConnection();
};
