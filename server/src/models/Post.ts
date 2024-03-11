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
}

export default Post;
