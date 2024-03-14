import createDatabaseConnection from "../config";

export class Tags {
  static async getTags() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    
    const query = `SELECT * FROM tags`;
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
  }
  catch(error: any) {
    console.error("Error in getPosts", error);
    throw error;
  }
}
