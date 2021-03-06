import express, { Response, Request } from "express";
const router = express.Router();
import * as userDb from "../api/userDb";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";

// LOGIN ROUTE

// needs req.body.username and req.body.password
router.post("/", async (req: Request, res: Response) => {
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

    //TODO: REFRESH TOKENS

    res.cookie("token", `bearer ${token}`);
    res.send({ res: "Sent token", id: searchResult[0].id });
  } catch (error: any) {
    res.send({ err: error.message });
  }
});

//SUB ROUTE

// needs req.body.username and req.body.password
router.post("/sub", async (req: Request, res: Response) => {
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
    console.log(error.message);
    res.send({ err: error.message });
  }
});

//validate cookie route

router.get("/cookie", verifyTokenHttp, (req: Request, res: Response) => {
  res.send({ res: "Validated", id: req.user });
});

export default router;
