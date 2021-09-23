import connection from "../config/dbConfig";
import { User } from "../models/user";

//READ
//SEARCH FOR USER

export const searchUserByUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE username = "${username}";`;

    connection.query(query, (err: Error, result: Array<string>) => {
      if (err) {
        console.error(err);
        reject({ message: "Database error" });
      }

      resolve(result);
    });
  });
};

//CREATE
//CREATE USER

export const addUser = (user: User) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO user(id, username, password)
      VALUES("${user.getId}"", "${user.getUsername}", "${user.getPassword}");`;

    connection.query(query, (err: Error, result: Array<string>) => {
      if (err) {
        console.error(err);
        reject({ message: "Database Error" });
      }
      resolve(result);
    });
  });
};
