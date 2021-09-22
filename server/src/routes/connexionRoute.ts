import express, { Response, Request } from "express";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";
const router = express.Router();
import connexion from "../config/dbConfig";
import * as userDb from "../api/userDb";

//LOGIN ROUTE

router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.body.username) {
      throw new Error("Username cannot be empty");
    }
    if (!req.body.password) {
      throw new Error("Password cannot be empty");
    }

    const result: any = await userDb.searchUserByUsername(req.body.username);

    if (result.length !== 0) {
      throw new Error("User already exists");
    }

    //TODO: ADD USER TO DB
  } catch (error: any) {
    res.send({ error: error.message });
  }
});

router.get("/sub", (req, res) => {
  res.send("UserCreated");
});

export default router;
