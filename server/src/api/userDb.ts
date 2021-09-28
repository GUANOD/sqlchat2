import { getResults } from "../config/dbConfig";
import { User } from "../models/User";

//READ
//SEARCH FOR USER

export const searchUserByUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE username = "${username}";`;
    getResults(query, resolve, reject);
  });
};

export const searchUserById = (id: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE id = "${id}";`;

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

//UPDATE PASSWORD

export const updatePassword = (newPassword: string, id: string) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user
      SET password = "${newPassword}"
      WHERE id = "${id}";`;

    getResults(query, resolve, reject);
  });
};
