import { useEffect, useRef, useState } from "react";
import { getMessages } from "../api/APIchat";
import { useSocket } from "../context/SocketContext";
import { ADDRESS } from "../helpers/Address";
import { Message } from "../models/Message";
import styles from "./styles/ChatBox.module.css";

interface ChatBoxProps {
  chatting: string;
}

interface MessageBubbleProps {
  chat: string;
  date: Date;
  receiver_ID: string;
  chatting: string;
}

export default function ChatBox({ chatting }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scroll = useRef<HTMLLIElement>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!chatting) return;
    getMessages(chatting, ADDRESS.getMessages)
      .then((data: any) => {
        console.log(data.res);
        let messages: Message[] = data.res.map((message: any) => {
          return new Message(
            message.chat,
            message.sender_ID,
            message.receiver_ID,
            new Date(message.date)
          );
        });
        setMessages(messages);
      })
      .catch((data) => console.log(data));
  }, [chatting]);

  const scrollToBottom = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (data: any) => {
      console.log(data);
      if (data.sender_ID !== chatting) {
        const formatDate: Message = new Message(
          data.chat,
          data.sender_ID,
          data.receiver_ID,
          new Date(data.date)
        );
        setMessages((prevMessages) => [...prevMessages, formatDate]);
      }
    });
  }, [socket, chatting]);

  //TODO: set the sent message in messages
  //TODO: put socket routes in a file
  // TODO: cleanup a bit

  return (
    <div className={styles.chatBar}>
      {messages.length ? (
        <ul>
          {messages.map((message) => {
            return (
              <MessageBubble
                chatting={chatting}
                chat={message.chat}
                receiver_ID={message.receiver_ID}
                date={message.date}
              />
            );
          })}
          <li ref={scroll}></li>
        </ul>
      ) : (
        <h6>Connect with your friends</h6>
      )}
    </div>
  );
}

export function MessageBubble({
  chat,
  receiver_ID,
  date,
  chatting,
}: MessageBubbleProps) {
  //TODO: ADD MONTH AND DAY
  const time = useRef<HTMLParagraphElement>(null);

  return (
    <li
      className={receiver_ID === chatting ? styles.sent : styles.received}
      onClick={() => {
        time.current?.classList.contains(styles.timeShow)
          ? time.current?.classList.remove(styles.timeShow)
          : time.current?.classList.add(styles.timeShow);
      }}
    >
      <p>{chat}</p>
      <p ref={time} className={styles.time}>
        {date.getHours()}h{date.getMinutes()}
      </p>
    </li>
  );
}
