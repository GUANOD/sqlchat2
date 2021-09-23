import express, { Response, Request } from "express";
const router = express.Router();
import * as userDb from "../api/userDb";
import { User } from "../models/user";

// LOGIN ROUTE

router.get("/", (req, res) => {
  res.send("UserCreated");
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

    if (searchResult.length !== 0) {
      throw new Error("User already exists");
    }

    await userDb.addUser(new User(req.body.username, req.body.password));

    res.send({ res: "User created" });
  } catch (error: any) {
    res.send({ error: error.message });
  }
});

export default router;
