import express, { Response, Request } from "express";
const router = express.Router();
import * as userDb from "../api/userDb";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN ROUTE

router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.body.username) {
      throw new Error("Username cannot be empty");
    }
    if (!req.body.password) {
      throw new Error("Password cannot be empty");
    }

    const searchResult: any = await userDb.searchUserByUsername(
      req.body.username
    );

    if (!searchResult.length) {
      throw new Error("Wrong credentials");
    }

    const correct: boolean = await bcrypt.compare(
      req.body.password,
      searchResult[0].password
    );

    if (!correct) {
      throw new Error("Wrong credentials");
    }

    const token: string = jwt.sign(
      { user: searchResult[0].id },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "24h" }
    );

    res.cookie("token", `bearer ${token}`, { httpOnly: true });
    res.send({ res: "Sent token" });
  } catch (error: any) {
    res.send({ error: error.message });
  }
});

//SUB ROUTE

router.get("/sub", async (req: Request, res: Response) => {
  try {
    if (!req.body.username) {
      throw new Error("Username cannot be empty");
    }
    if (!req.body.password) {
      throw new Error("Password cannot be empty");
    }

    const searchResult: any = await userDb.searchUserByUsername(
      req.body.username
    );

    if (searchResult.length) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);

    await userDb.addUser(new User(req.body.username, hashed));

    res.send({ res: "User created" });
  } catch (error: any) {
    res.send({ error: error.message });
  }
});

export default router;
