import { Connection } from "mysql";

const mysql = require("mysql");

const Connect = async () =>
  new Promise<Connection>((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "sqlchat2",
    });

    connection.connect((err: Error) => {
      if (err) {
        console.error(err);
        reject({ message: "Database error" });
        return;
      }
      console.log("db connected");
      resolve(connection);
    });
  });

const Query = async (connection: Connection, query: string) =>
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        console.error(error);
        reject({ message: "Database Error" });
        return;
      }
      resolve(result);
    });
  });

const getResults = (query: string, resolve: any, reject: any) => {
  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          resolve(results);
        })
        .catch((error) => {
          reject(error);
          return;
        })
        .finally(() => {
          console.log("terminating connection");
          connection.end();
        });
    })
    .catch((error: any) => {
      reject(error);
    });
};

export { getResults };
