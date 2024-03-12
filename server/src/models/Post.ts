import createDatabaseConnection from "../config";

class Post {
  static async getPosts() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = "SELECT * FROM posts";
      const data = await new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in getPosts", error);
      throw error;
    }
  }

  static async getPostById(postId: number, userId: number) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query =
      "SELECT p.id, u.username, p.title, p.description, p.createdAt FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?";

    try {
      const data = await new Promise((resolve, reject) => {
        db.query(query, [postId, userId], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      });

      return data;
    } catch (error: any) {
      throw new Error(`Error in getPostById: ${error.message}`);
    }
  }

  static createPost(
    image: string,
    title: string,
    description: string,
    createdAt: string,
    userId: number
  ): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO posts (`image`, `title`, `description`, `createdAt`, `user_id`) VALUES (?, ?, ?, ?, ?)";
      const values = [image, title, description, createdAt, userId];

      db.query(query, values, (error, result) => {
        connection.closeConnection();
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static deletePostById(postId: number, userId: number): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";
      db.query(query, [postId, userId], (error, result) => {
        connection.closeConnection();
        if (error) {
          reject(error);
        } else if (result.affectedRows === 0) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updatePost(
    image: string,
    title: string,
    description: string,
    postId: number,
    userId: number
  ): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const q =
        "UPDATE posts SET `image` = ?, `title` = ?, `description` = ? WHERE `id` = ? AND `user_id` = ?";
      const values = [image, title, description, postId, userId];

      db.query(q, values, (error, result) => {
        connection.closeConnection();
        if (error) {
          reject(error);
        } else if (result.affectedRows === 0) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static checkPostExists(postId: number): Promise<boolean> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query = "SELECT COUNT(*) AS count FROM posts WHERE 'id' = ?";
      const values = [postId];

      db.query(query, values, (error, result) => {
        connection.closeConnection();
        if(error) {
          reject(error)
        } else {
          resolve(result[0].count > 0);
        }
      });
    });
  }
}

export default Post;
