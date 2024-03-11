import createDatabaseConnection from "../config";

class Post {
  static async getPosts() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = "SELECT * FROM posts";
      const data = await new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
          if (error) {
            connection.closeConnection();
            reject(error);
          } else {
            connection.closeConnection();
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
      const post = await new Promise((resolve, reject) => {
        db.query(query, [postId, userId], (error, result) => {
          if (error) {
            connection.closeConnection();
            reject(error);
          } else {
            connection.closeConnection();
            resolve(result[0]);
          }
        });
      });

      return post;
    } catch (error: any) {
      throw new Error(`Error in getPostById: ${error.message}`);
    }
  }

  static deletePostById(postId: number, userId: number): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const q = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";
      db.query(q, [postId, userId], (error, data) => {
        if (error) {
          connection.closeConnection();
          reject(error);
        } else {
          connection.closeConnection();
          resolve(data);
        }
      });
    });
  }

 static createPost(image: string, title: string, description: string, createdAt: string, userId: number): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const q = "INSERT INTO posts (`image`, `title`, `description`, `createdAt`, `user_id`) VALUES (?, ?, ?, ?, ?)";
      const values = [image, title, description, createdAt, userId];
      
      db.query(q, values, (error, data) => {
        if (error) {
          connection.closeConnection();
          reject(error);
        } else {
          connection.closeConnection();
          resolve(data);
        }
      });
    });
  }
}

export default Post;
