import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();
class DatabaseConnection {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    this.connection.connect((error) => {
      if (error) {
        console.log("Error connecting database");
      } else {
        console.log("Successful");
      }
    });
  }

  getConnection(): mysql.Connection {
    return this.connection;
  }

  closeConnection(): void {
    this.connection.end((error) => {
      if (error) {
        console.log("Error closing connection");
      } else {
        console.log("Connection closed successfully");
      }
    });
  }
}

const databaseConnection = new DatabaseConnection();
export default databaseConnection;
