import { query } from "express";
import createDatabaseConnection from "../config";
// import { Tags } from "./Tags";
interface Tag {
  id: string;
  name: string;
}
interface PostInterface {
  post_id: string;
  title: string;
  description: string;
  post_createdAt: Date;
  tags: Tag[];
}
interface TagRow {
  name: string;
}

type PostInputs = {
  title: string;
  description: string;
  user_id: string;
  tags: string[];
  files: Express.Multer.File[];
};
class Post {
  static async getPosts() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
        SELECT 
          p.*, 
          u.username, 
          u.profile_picture,
          GROUP_CONCAT(t.name) AS tags
        FROM posts p LEFT JOIN users u  ON  p.user_id = u.id
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id GROUP BY p.id`;

      const data = await new Promise<PostInterface[]>((resolve, reject) => {
        db.query(query, (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            const postsWithTags = result.map((post: any) => ({
              ...post,
              tags: post.tags
                ? post.tags
                    .split(",")
                    .map((tagName: string) => ({ id: "", name: tagName }))
                : [],
            }));
            resolve(postsWithTags);
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
            reject(new Error("Post does not exist"));
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
        (post: PostInterface) => post.post_id === row.post_id
      );

      if (existingPostIndex === -1) {
        structuredData.posts.push({
          post_id: row.post_id,
          title: row.title,
          description: row.description,
          post_createdAt: row.post_createdAt,
          tags: row.tags
            ? row.tags
                .split(",")
                .map((tagName: string) => ({ id: "", name: tagName.trim() }))
            : [],
        });
      } else {
        if (row.tags) {
          structuredData.posts[existingPostIndex].tags.push(
            ...row.tags
              .split(",")
              .map((tagName: string) => ({ id: "", name: tagName.trim() }))
          );
        }
      }
    });

    return structuredData;
  }

  static async createPost(inputs: PostInputs): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const postQuery =
        "INSERT INTO posts (`title`, `description`, `createdAt`, `user_id`) VALUES (?, ?, ?, ?)";
      const postValues = [
        inputs.title,
        inputs.description,
        new Date(),
        inputs.user_id,
      ];

      db.query(postQuery, postValues, async (error, result) => {
        if (error) {
          console.error("Error inserting post:", error);
          connection.closeConnection();
          throw error;
        }

        const postId = result.insertId;

        try {
          await Post.addTags(postId, inputs.tags);
          await Post.addImages(postId, inputs.files);
          connection.closeConnection();
          return { success: true, postId };
        } catch (error) {
          console.error("Error adding tags or images:", error);
          connection.closeConnection();
          throw error;
        }
      });
    } catch (error) {
      console.error("Error in createPost:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async addTags(postId: number, tags: string[]) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      if (tags) {
        const query = "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)";
        await new Promise((resolve, reject) => {
          for (const tag of tags) {
            db.query(query, [postId, tag], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          }
        });
      }

      connection.closeConnection();

      return { success: true };
    } catch (error) {
      console.error("Error in addTags", error);
      throw error;
    }
  }

  static async addImages(postId: any, images: Express.Multer.File[]) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    const query = "INSERT INTO images (post_id, image) VALUES (?, ?)";
  
    try {
      for (const element of images) {
        await new Promise((resolve, reject) => {
          db.query(query, [postId, element.path], (err, _) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        });
      }
      connection.closeConnection();
      return { success: true };
    } catch (error) {
      console.error("Error in addImages", error);
      throw error;
    }
  }

  static deletePostById(postId: number): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const q = "DELETE FROM posts WHERE `id` = ?";
      db.query(q, [postId], (error, data) => {
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

  static async getAuthors() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
        SELECT DISTINCT u.*
        FROM users u
        JOIN posts p ON u.id = p.user_id`;

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
      console.error("Error in getAuthors", error);
      throw error;
    }
  }
}

export default Post;
