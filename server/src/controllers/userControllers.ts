import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import databaseConnection from "../config";

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const connection = databaseConnection;
  const db = connection.getConnection();

  db.query("SELECT * FROM data", (error, result) => {
    if (error) {
      connection.closeConnection();
    }
    res.json(result);
    connection.closeConnection();
  });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const connection = databaseConnection;
  const db = connection.getConnection();
  const { username, email, password, bio } = req.body;
  const { id } = req.params;

  const checkQuery =
    "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
  db.query(checkQuery, [username, email, id], (checkError, checkResult) => {
    if (checkError) {
      console.log("Error checking username/email:", checkError);
      res.status(400).json({ message: "Error checking username/email" });
      return connection.closeConnection(); // Close connection on error
    }

    if (checkResult && checkResult.length > 0) {
      res.status(400).json({ message: "Username or email already exists" });
      return connection.closeConnection(); // Close connection if username/email exists
    }

    let query;
    let queryParams;

    if (password.trim() === "") {
      // If the password field is empty, don't update the password in the database
      query = "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
      queryParams = [username, email, bio, id];
    } else {
      // If the password field is not empty, update all fields including the password
      query =
        "UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?";
      queryParams = [username, email, password, bio, id];
    }

    db.query(query, queryParams, (error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return connection.closeConnection(); // Close connection on error
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
        connection.closeConnection(); // Close connection after handling the result
      }
    });
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = databaseConnection;
  const db = connection.getConnection();

  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting user:", error);
      const customError = new CustomError(500, "Internal Server Error");
      connection.closeConnection();
      return next(customError);
    }

    if (result.affectedRows === 0) {
      const customError = new CustomError(400, "User not found");
      connection.closeConnection();
      return next(customError);
    }

    res.status(200).json({ message: "User deleted successfully" });
    connection.closeConnection();
  });
};
