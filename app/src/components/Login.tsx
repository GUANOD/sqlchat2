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

  const handleClick = (option: string) => {
    switch (option) {
      case "user":
        userRef.current?.classList.add(styles.hover);
        break;
      case "pass":
        passRef.current?.classList.add(styles.hover);
        break;
      default:
        return;
    }
  };

  const handleBlur = (option: string) => {
    switch (option) {
      case "user":
        if (!username) {
          userRef.current?.classList.remove(styles.hover);
        }
        break;
      case "pass":
        if (!password) {
          passRef.current?.classList.remove(styles.hover);
        }

        break;
      default:
        return;
    }
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
            onClick={() => handleClick("user")}
            onBlur={() => handleBlur("user")}
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
            onClick={() => handleClick("pass")}
            onBlur={() => handleBlur("pass")}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
