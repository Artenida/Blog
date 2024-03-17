import createDatabaseConnection from "../config";
interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string;
}

interface DeleteResult {
  affectedRows?: number;
}

interface UpdateResult {
  success: boolean;
  message: string;
}

export class User {
  static async findByUsername(username: string): Promise<UserData[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const checkQuery = "SELECT * FROM users WHERE username = ?";
      const data = await new Promise<UserData[]>((resolve, reject) => {
        db.query(checkQuery, [username], (error, data) => {
          if (error) {
            connection.closeConnection();
            reject(error);
          } else {
            connection.closeConnection();
            resolve(data as UserData[]);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in findByUsername:", error);
      throw error;
    }
  }

  static async createUser(username: string, email: string, password: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const insertQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      const values = [username, email, password];

      await db.query(insertQuery, values);
      connection.closeConnection();

      return true;
    } catch (error) {
      connection.closeConnection();
      throw error;
    }
  }

  static async getAllUserData(): Promise<any[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const data = await new Promise<any[]>((resolve, reject) => {
        db.query("SELECT * FROM users", (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
          connection.closeConnection();
        });
      });

      return data;
    } catch (error) {
      console.error("Error in getAllUserData:", error);
      throw error;
    }
  }

  static async updateUser(
    id: string,
    username: string,
    email: string,
    password: string,
    profile_picture: string,
    bio: string
  ): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      let query: string;
      let queryParams: (string | number)[];

      if (password.trim() === "") {
        query =
          "UPDATE users SET username = ?, email = ?, profile_picture = ?, bio = ?, WHERE id = ?";
        queryParams = [username, email, profile_picture, bio, id];
      } else {
        query =
          "UPDATE users SET username = ?, email = ?, password = ?, profile_picture = ?, bio = ? WHERE id = ?";
        queryParams = [username, email, password, profile_picture, bio, id];
      }

      const result: any = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, result) => {
          if (error) {
            console.error("Error updating user:", error);
            reject("Internal Server Error");
          } else if (result.changedRows === 1) {
            resolve({
              success: true,
              message: "User updated successfully",
            });
          }
        });
      });

      connection.closeConnection();

      if (!result) {
        throw new Error("User update failed");
      }

      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      connection.closeConnection();
      throw error;
    }
  }


  static async updateProfilePicture(
    userId: string,
    imageUrl: string
  ): Promise<void> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
          UPDATE users
          SET profile_picture = ?
          WHERE id = ?
        `;

      await new Promise<void>((resolve, reject) => {
        db.query(query, [imageUrl, userId], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error("Error in updateProfilePicture", error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = "DELETE FROM users WHERE id = ?";
      const result: DeleteResult = await new Promise((resolve, reject) => {
        db.query(query, [id], (error, result) => {
          if (error) {
            console.error("Error deleting user:", error);
            connection.closeConnection();
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      connection.closeConnection();

      if (result && result.affectedRows === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
