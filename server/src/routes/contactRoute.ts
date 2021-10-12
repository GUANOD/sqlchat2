import express, { Response, Request } from "express";
import { getContacts, postContacts } from "../api/contactDb";
import { searchUserById, searchUserByUsername } from "../api/userDb";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";

const router = express.Router();

//add contact

// needs req.body.contact
router.post("/post", verifyTokenHttp, async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    let contact: any;

    if (req.body.contact) {
      console.log("contact", req.body.contact);
      contact = await searchUserByUsername(req.body.contact);
    } else if (req.body.contact_ID) {
      console.log("contactID", req.body.contact_ID);
      contact = await searchUserById(req.body.contact_ID);
    } else {
      throw new Error("Please input contact");
    }

    console.log("found", contact);

    if (!contact.length) {
      res.status(418).send({ err: "Contact not found" });
      return;
    }

    console.log(await postContacts(req.user, contact[0].id));
    res.send({ res: "Successful" });
  } catch (error: any) {
    res.status(418).send({ err: error.message });
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
