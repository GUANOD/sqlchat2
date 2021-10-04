import React, { useState, useRef } from "react";
import styles from "./styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userRef = useRef<HTMLLabelElement>(null);
  const passRef = useRef<HTMLLabelElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword("");
    setUsername("");
  };

  return (
    <div className={styles.container}>
      <h2>Sign in</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username" ref={userRef}>
            Username
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => userRef.current?.classList.add(styles.hover)}
            onBlur={() =>
              !username ? userRef.current?.classList.remove(styles.hover) : ""
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password" ref={passRef}>
            Password
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => passRef.current?.classList.add(styles.hover)}
            onBlur={() =>
              !password ? passRef.current?.classList.remove(styles.hover) : ""
            }
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
