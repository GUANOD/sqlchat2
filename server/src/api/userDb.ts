import connection from "../config/dbConfig";

//READ
//SEARCH FOR USER

//TODO: CREATE MODELS FOR USER, MESSAGE, CONTACT
//
//
//

export const searchUserByUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM user WHERE username = "${username}";`;
      connection.query(query, (err: Error, result: Array<string>) => {
        if (err) throw err;
        resolve(result);
      });
    } catch (error: any) {
      reject(error);
    }
  });
};
