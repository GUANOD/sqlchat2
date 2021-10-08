import React, { useContext, useEffect, useRef, useState } from "react";
import { ErrorContext } from "../context/ErrorContext";
import { SocketProvider, useSocket } from "../context/SocketContext";
import { Contact } from "../models/Contact";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";
import styles from "./styles/Chat.module.css";

type Props = {
  id: string;
};

export default function Chat({ id }: Props) {
  const [chatting, setChatting] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <SocketProvider id={id}>
      <div className={styles.chat}>
        <SideBar
          setContacts={setContacts}
          contacts={contacts}
          chatting={chatting}
          setChatting={setChatting}
        />
        <ChatBox chatting={chatting} />
        <ChatInput chatting={chatting} />
      </div>
    </SocketProvider>
  );
}

interface ChatInput {
  chatting: string;
}

export function ChatInput({ chatting }: ChatInput) {
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useContext(ErrorContext);
  const submitRef = useRef<HTMLInputElement>(null);

  console.log(socket);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatting) {
      setError("Please choose a contact.");
      return;
    }
    if (!message) {
      setError("Please input your message.");
      return;
    }

    socket.emit("emit", { msg: message, receiver_ID: chatting });
    setMessage("");
  };

  return (
    <div className={styles.chatInput}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input ref={submitRef} type="submit" value="Send" />
      </form>
    </div>
  );
}
