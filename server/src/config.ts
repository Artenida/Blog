import mysql from "mysql";

class DatabaseConnection {
    private connection: mysql.Connection;

    constructor() {
      this.connection = mysql.createConnection (
        {
            host: "localhost", 
    user: "root",
    password: "artenidanew",
    database: "blog"
        }
      );

      this.connection.connect((error) => {
        if(error) {
            console.log("Error connecting database")
        } else {
            console.log("Successful");
        }
      });
    }

    getConnection() : mysql.Connection {
        return this.connection;
    }

    closeConnection() : void {
        this.connection.end((error) => {
            if(error) {
                console.log("Error closing connection");
            } else {
                console.log("Connection closed successfully");
            }
        })
    }
}

export default DatabaseConnection;

