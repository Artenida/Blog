import createDatabaseConnection from "../config";
interface Post {
  post_id: number;
  title: string;
  description: string;
  post_createdAt: Date;
  tags: string[];
}

class Post {
  static async getPosts() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
        SELECT 
          p.*, 
          u.username, 
          u.profile_picture 
        FROM 
          posts p
        LEFT JOIN 
          users u 
        ON 
          p.user_id = u.id`;

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

  static async getPostById(postId: number) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query = `
        SELECT 
            u.id AS user_id,
            u.username,
            u.profile_picture,
            p.id AS post_id,
            p.title,
            p.description,
            p.createdAt AS post_createdAt,
            GROUP_CONCAT(t.name) AS tags
        FROM posts p 
        LEFT JOIN users u ON p.user_id = u.id 
        LEFT JOIN post_tags pt ON p.id = pt.post_id 
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.id = ?
        GROUP BY p.id`;

    return new Promise((resolve, reject) => {
      db.query(query, [postId], (err, result) => {
        if (err) {
          reject(err);
          connection.closeConnection();
        } else {
          if (result.length === 0) {
            reject(new Error("Post does not exist")); // Throw an error explicitly when the post is not found
            connection.closeConnection();
          } else {
            const structuredResult = Post.structurePostResult(result);
            resolve(structuredResult);
            connection.closeConnection();
          }
        }
      });
    });
  }

  static structurePostResult(result: any[]) {
    const structuredData: any = {
      user: {},
      posts: [],
    };

    result.forEach((row, index) => {
      if (index === 0) {
        structuredData.user = {
          user_id: row.user_id,
          username: row.username,
          profile_picture: row.profile_picture,
        };
      }
      const existingPostIndex = structuredData.posts.findIndex(
        (post: Post) => post.post_id === row.post_id
      );

      if (existingPostIndex === -1) {
        structuredData.posts.push({
          post_id: row.post_id,
          title: row.title,
          description: row.description,
          post_createdAt: row.post_createdAt,
          tags: row.tags ? [row.tags] : [],
        });
      } else {
        if (row.tags) {
          structuredData.posts[existingPostIndex].tags.push(row.tags);
        }
      }
    });

    return structuredData;
  }

  static async createPost(
    image: string,
    title: string,
    description: string,
    createdAt: string,
    userId: number,
    tags: string[]
  ): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const postQuery =
        "INSERT INTO posts (`image`, `title`, `description`, `createdAt`, `user_id`) VALUES (?, ?, ?, ?, ?)";
      const postValues = [image, title, description, createdAt, userId];
      const postResult: { insertId: number } = await new Promise(
        (resolve, reject) => {
          db.query(postQuery, postValues, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        }
      );

      const postId = postResult.insertId;

      await this.addTags(postId, tags);

      connection.closeConnection();

      return postResult;
    } catch (error) {
      console.error("Error in createPost", error);
      connection.closeConnection();
      throw error;
    }
  }

  // static async getPostByTitle(title: string, user_id: number): Promise<number | null> {
  //   const connection = createDatabaseConnection();
  //   const db = connection.getConnection();

  //   const query = 'SELECT id FROM posts WHERE title = ? AND user_id = ?';
  //   const values = [title, user_id];
  //   return new Promise((resolve, reject) => {
  //     db.query(query, values, (error, result) => {
  //       connection.closeConnection();

  //       if (error) {
  //         reject(error);
  //       } else {
  //         if (result.length > 0) {
  //           resolve(result[0].id);
  //         } else {
  //           resolve(null)
  //         }
  //       }
  //     });
  //   });
  // }

  static async addTags(postId: number, tags: string[]) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      for (const tag of tags) {
        const query = "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)";
        await new Promise((resolve, reject) => {
          db.query(query, [postId, tag], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      }

      connection.closeConnection();

      return { success: true };
    } catch (error) {
      console.error("Error in addTags", error);
      throw error;
    }
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
        if (error) {
          reject(error);
        } else {
          resolve(result[0].count > 0);
        }
      });
    });
  }

  static async getUsersPost(userId: number) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    const query = "SELECT * FROM posts WHERE user_id = ?";
    const values = [userId];

    try {
      return new Promise((resolve, reject) => {
        db.query(query, values, (error, result) => {
          connection.closeConnection();

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.error("Error in getUsersPost", error);
      connection.closeConnection();
      throw error;
    }
  }
}

export default Post;
