import express, { Response, Request } from "express";
import { searchUserById, updatePassword, updateUserName } from "../api/userDb";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";
import bcrypt from "bcrypt";
const router = express.Router();

//Change password or username

// needs req.body.action ("updateUsername" or "updatePassword") and req.body.newUsername or req.body.newUsername
router.post("/", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    if (!req.body.action) throw new Error("Select what to do.");

    switch (req.body.action) {
      case "updateUsername":
        if (!req.body.newUsername)
          throw new Error("Please provide new username.");

        await updateUserName(req.body.newUsername, req.user);

        res.send({ res: "Successful" });
        break;

      case "updatePassword":
        if (!req.body.newPassword)
          throw new Error("Please provide new password.");

        const hashed = await bcrypt.hash(req.body.newPassword, 12);
        await updatePassword(hashed, req.user);

        res.send({ res: "Successful" });

        break;
      default:
        res.send({ res: "Could not understand what to do." });
    }
  } catch (error: any) {
    console.log("sending error");
    res.send({ err: error.message });
  }
});

export default router;
