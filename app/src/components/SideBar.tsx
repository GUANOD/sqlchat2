import React, { useEffect } from "react";
import { simpleCredentialGet } from "../api/APIconnexion";
import { ADDRESS } from "../helpers/Address";
import { Contact } from "../models/Contact";
import styles from "./styles/SideBar.module.css";

interface SideBarProps {
  setContacts: Function;
  contacts: Contact[];
  chatting: string;
  setChatting: Function;
}

interface ContactButtonProps {
  contact: Contact;
  chatting: string;
  setChatting: Function;
}

export default function SideBar({
  setContacts,
  contacts,
  chatting,
  setChatting,
}: SideBarProps) {
  useEffect(() => {
    simpleCredentialGet(ADDRESS.getContacts)
      .then((data: any) => {
        console.log(data);
        if (data.length) {
          data.forEach((contact: Contact) => {
            setContacts((prevContacts: any) => [
              ...prevContacts,
              new Contact(contact.id, contact.username),
            ]);
          });
        }
      })
      .catch((data) => console.log("rejected", data));
  }, [setContacts]);

  return (
    <div className={styles.sideBar}>
      {contacts.map((contact) => {
        return (
          <ContactButton
            contact={contact}
            chatting={chatting}
            setChatting={setChatting}
          />
        );
      })}
    </div>
  );
}

export function ContactButton({
  contact,
  chatting,
  setChatting,
}: ContactButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setChatting(contact.id);
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      key={contact.id}
      className={
        chatting === contact.id
          ? `${styles.contact} ${styles.clicked}`
          : styles.contact
      }
    >
      <img src={contact.pic} />
      <div className={styles.details}>
        <h5>{contact.username}</h5>
        <h6>{contact.username}</h6>
      </div>
    </button>
  );
}
