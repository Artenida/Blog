import createDatabaseConnection from "../config";
interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
}
export class User {
  static async findByUsername(username: string): Promise<UserData[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise<UserData[]>((resolve, reject) => {
      const checkQuery = "SELECT * FROM users WHERE username = ?";
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
  }

  static async createUser(username: string, email: string, password: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const insertQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      const values = [username, email, password];
      db.query(insertQuery, values, (error) => {
        if (error) {
          connection.closeConnection();
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async getAllUserData(): Promise<any[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise<any[]>((resolve, reject) => {
      db.query("SELECT * FROM users", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
        connection.closeConnection();
      });
    });
  }

  static async updateUser(
    id: string,
    username: string,
    email: string,
    password: string,
    bio: string
  ): Promise<{ success: boolean; message: string }> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise<{ success: boolean; message: string }>(
      (resolve, reject) => {
        const checkQuery =
          "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
        db.query(
          checkQuery,
          [username, email, id],
          (checkError, checkResult) => {
            if (checkError) {
              console.error("Error checking username/email:", checkError);
              reject("Error checking username/email");
              return connection.closeConnection();
            }

            if (checkResult && checkResult.length > 0) {
              reject("Username or email already exists");
              return connection.closeConnection();
            }

            let query;
            let queryParams;

            if (password.trim() === "") {
              query =
                "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
              queryParams = [username, email, bio, id];
            } else {
              query =
                "UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?";
              queryParams = [username, email, password, bio, id];
            }

            db.query(query, queryParams, (error, result) => {
              if (error) {
                console.error("Error updating user:", error);
                reject("Internal Server Error");
                return connection.closeConnection();
              } else if (result.changedRows === 1) {
                resolve({
                  success: true,
                  message: "User updated successfully",
                });
                connection.closeConnection();
              }
            });
          }
        );
      }
    );
  }

  static async deleteUser(id: number): Promise<boolean> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id = ?";
      db.query(query, [id], (error, result) => {
        if (error) {
          console.error("Error deleting user:", error);
          connection.closeConnection();
          reject(error);
        }

        if (result.affectedRows === 0) {
          resolve(false);
        }

        resolve(true);
        connection.closeConnection();
      });
    });
  }
}
