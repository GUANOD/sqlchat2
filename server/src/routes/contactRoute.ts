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

    const contactID: any = await searchUserByUsername(req.body.contact);
    console.log(contactID);
    console.log(contactID[0].id);
    if (contactID.length === 0) {
      res.status(402).send({ res: "Contact not found" });
      return;
    }

    await postContacts(req.user, contactID[0].id);
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
