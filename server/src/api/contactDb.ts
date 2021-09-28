import { getResults } from "../config/dbConfig";

//READ

export const getContacts = (user: string) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT id, username FROM user
    WHERE id IN(
      SELECT contact_ID FROM contact
      WHERE owner_ID = "${user}"
    );`;

    getResults(query, resolve, reject);
  });
};

//CREATE

export const postContacts = (owner_ID: string, contact_ID: string) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO contact(owner_ID, contact_ID)
    VALUES("${owner_ID}", "${contact_ID}");`;

    getResults(query, resolve, reject);
  });
};
