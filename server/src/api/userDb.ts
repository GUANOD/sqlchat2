import { getResults } from "../config/dbConfig";
import { User } from "../models/User";
import {} from "mysql";
import { connect } from "http2";

//READ
//SEARCH FOR USER

//TODO: BOTH SHOULD RETURN USERS

export const searchUserByUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE username = "${username}";`;
    getResults(query, resolve, reject);
  });
};

export const searchUserById = (id: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE id = "${id}";`;

    // connection.query(query, (err: Error, result: OkPacket) => {
    //   if (err) {
    //     console.error(err);
    //     reject({ message: "Database error" });
    //   }
    //   if (result.length) {
    //     resolve(new User(result[0].username, result[0].password, result[0].id));
    //   }
    //   resolve(result);

    getResults(query, resolve, reject);
  });
};

//CREATE
//CREATE USER

export const addUser = (user: User) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO user(id, username, password)
      VALUES("${user.getId}", "${user.getUsername}", "${user.getPassword}");`;
    getResults(query, resolve, reject);
  });
};

//UPDATE
//UPDATE USERNAME

export const updateUserName = (newUsername: string, id: string) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user
      SET username = "${newUsername}"
      WHERE id = "${id}";`;
    getResults(query, resolve, reject);
  });
};

// export const updatePassword = (newPassword: string, id: string) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       UPDATE user
//       SET username = ${newPassword}
//       WHERE id = ${id};`;

//     connection.query(query, (err: Error, result: Array<string>) => {
//       if (err) {
//         console.error(err);
//         reject({ message: "Database Error" });
//       }

//       resolve(result);
//     });
//   });
// };
