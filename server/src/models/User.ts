import createDatabaseConnection from "../config";
interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
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
      const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
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
    bio: string
  ): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
  
    try {
      const checkQuery =
        "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
      const checkResult: any[] = await new Promise((resolve, reject) => {
        db.query(
          checkQuery,
          [username, email, id],
          (checkError, checkResult) => {
            if (checkError) {
              console.error("Error checking username/email:", checkError);
              reject("Error checking username/email");
            } else {
              resolve(checkResult);
            }
          }
        );
      });
  
      if (checkResult && checkResult.length > 0) {
        connection.closeConnection();
        throw new Error("Username or email already exists");
      }
  
      let query: string;
      let queryParams: (string | number)[];
  
      if (password.trim() === "") {
        query =
          "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
        queryParams = [username, email, bio, id];
      } else {
        query =
          "UPDATE users SET username = ?, email = ?, password = ?, bio = ? WHERE id = ?";
        queryParams = [username, email, password, bio, id];
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
