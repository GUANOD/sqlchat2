import express, { Response, Request } from "express";
import { getContacts, postContacts } from "../api/contactDb";
import { searchUserByUsername } from "../api/userDb";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";

const router = express.Router();

//add contact

// needs req.body.contact
router.post("/post", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    if (!req.body.contact) throw new Error("Please input contact");

    await postContacts(req.user, req.body.contact);
    res.send({ res: "Successful" });
  } catch (error: any) {
    res.send({ err: error.message });
  }
});

//fetch contacts

router.get("/", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    const contacts = await getContacts(req.user);
    res.send(contacts);
  } catch (error: any) {
    res.send({ err: error.message });
  }
});

export default router;
