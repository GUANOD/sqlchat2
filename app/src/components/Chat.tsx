import React, { useEffect, useState } from "react";
import { Contact } from "../models/Contact";
import ChatBar from "./ChatBox";
import SideBar from "./SideBar";
import styles from "./styles/Chat.module.css";

export default function Chat() {
  const [chatting, setChatting] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [cache, setCache] = useState([]);

  return (
    <div className={styles.chat}>
      <SideBar
        setContacts={setContacts}
        contacts={contacts}
        chatting={chatting}
        setChatting={setChatting}
      />
      <ChatBar />
      <ChatInput />
    </div>
  );
}

export function ChatInput() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.chatInput}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea placeholder="Type your message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
