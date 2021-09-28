import { getResults } from "../config/dbConfig";
import { Message } from "../models/Message";

//READ
//FETCH MESSAGES BETWEEN USERS

export const getMessages = (sender_ID: string, receiver_ID: string) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT * FROM message
    WHERE sender_ID = "${sender_ID}" AND receiver_ID = "${receiver_ID}"; `;

    getResults(query, resolve, reject);
  });
};
//CREATE
//CREATE MESSAGE

export const addMessage = (message: Message) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO message(chat, sender_ID, receiver_ID, date)
    VALUES("${message.chat}", "${message.sender_ID}", "${message.receiver_ID}", "${message.date}");
    `;
    getResults(query, resolve, reject);
  });
};
