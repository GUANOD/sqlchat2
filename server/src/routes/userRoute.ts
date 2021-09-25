import express, { Response, Request } from "express";
import { searchUserById, updateUserName } from "../api/userDb";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    if (!req.body.action) throw new Error("Select what to do.");

    switch (req.body.action) {
      case "updateUsername":
        await updateUserName(req.body.newUsername, req.user);
        res.send({ res: "Successful" });
        break;
      case "updatePassword":
        const userResult: any = await searchUserById(req.user);
        if (!userResult.length) throw new Error("User not found");

        const correct: boolean = await bcrypt.compare(
          req.body.password,
          userResult[0].id
        );
        if (!correct) throw new Error("Password is wrong");

        // TODO: CHANGE PASSWORD IN USERBD.TS
        break;
      default:
        res.send({ res: "Could understand what to do." });
    }
  } catch (error: any) {
    console.log("sending error");
    res.send({ error: error.message });
  }
});

export default router;
