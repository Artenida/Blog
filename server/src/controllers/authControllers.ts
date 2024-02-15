import { Request, Response, query } from "express";
import { db } from "../config";

export const register = async (req: Request, res: Response) => {
  try {
    // Check if user exists
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkQuery, [req.body.username], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length > 0) {
        return res.status(409).json("User already exists");
      } else {
        // Create a new user
        const insertQuery =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, req.body.password];
        db.query(insertQuery, values, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(201).json("User has been created");
        });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const login = (req: Request, res: Response): void => {
  // Your code for login endpoint
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    // const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    if (!req.body.password) {
      return res.status(400).json("Wrong password or username!");
    }
  });
};

export const logout = (req: Request, res: Response): void => {
  // Your code for logout endpoint
};
