import React, { useState, useRef } from "react";
import { post } from "../api/connexion";
import styles from "./styles/Login.module.css";
import { ADDRESS } from "../helpers/Address";
import { setServers } from "dns";

interface Props {
  err: string;
  setErr: Function;
}

export default function LoginSub(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const userRef = useRef<HTMLLabelElement>(null);
  const passRef = useRef<HTMLLabelElement>(null);
  const passConfRef = useRef<HTMLLabelElement>(null);

  //SUBMIT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      props.setErr("Username cannot be empty.");
      return;
    }

    if (!password) {
      props.setErr("Password cannot be empty.");
      return;
    }

    if (password.length < 8) {
      props.setErr("Password needs to be at least 8 characters long.");
      return;
    }

    //IF CREATE ACCOUNT
    if (toggle) {
      if (password !== passConfirm) {
        props.setErr("Password confirmation is not equal to password.");
        return;
      }

      try {
        console.log(ADDRESS.postSub);
        const res: any = await post({ username, password }, ADDRESS.postSub);
        console.log(res);
        props.setErr(res.res);
        setToggle(false);
      } catch (error: any) {
        props.setErr(error.error);
      }
    } else {
      try {
        const res = await post({ username, password }, ADDRESS.postLogin);
        console.log(res);
      } catch (error: any) {
        props.setErr(error.error);
      }
    }

    setPassword("");
    setUsername("");
    setPassConfirm("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{toggle ? "Create Account" : "Log In"}</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
            onFocus={() => userRef.current?.classList.add(styles.hover)}
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
            onFocus={() => passRef.current?.classList.add(styles.hover)}
            onBlur={() =>
              !password ? passRef.current?.classList.remove(styles.hover) : ""
            }
          />
        </div>
        {toggle ? (
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="passConf"
              ref={passConfRef}
            >
              Confirm Password
            </label>
            <input
              autoComplete="off"
              className={styles.input}
              type="password"
              name="passConf"
              id="passConf"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
              onFocus={() => passConfRef.current?.classList.add(styles.hover)}
              onBlur={() =>
                !passConfirm
                  ? passConfRef.current?.classList.remove(styles.hover)
                  : ""
              }
            />
          </div>
        ) : (
          ""
        )}

        <input
          className={styles.button}
          type="submit"
          value={toggle ? "Create account" : "Log In"}
        />
      </form>
      <button
        className={styles.create}
        onClick={() => setToggle(toggle ? false : true)}
      >
        {toggle ? "Log in" : "Create Account"}
      </button>
    </div>
  );
}
