import express, { Response, Request } from "express";
import { addMessage } from "../api/messageDb";
import { getMessages } from "../api/messageDb";
import { getResults } from "../config/dbConfig";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";
const router = express.Router();
import { Message } from "../models/Message";

//GET ALL MESSAGES BETWEEN USER

router.post("/", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (!req.body.receiver_ID) throw new Error("Unable to fetch messages");

    const messages = await getMessages(req.user, req.body.receiver_ID);
    res.send({ res: messages });
  } catch (error: any) {
    res.send({ err: error.message });
  }
});

//POST NEW MESSAGE
router.post("/post", verifyTokenHttp, async (req: Request, res: Response) => {
  try {
    if (!req.body.chat) throw new Error("Please input message");

    const messageDate = new Date();
    const dateFormated = messageDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const newMessage: Message = new Message(
      req.body.chat,
      req.user,
      req.body.receiver,
      dateFormated
    );

    await addMessage(newMessage);

    res.send({ res: "Sent" });
  } catch (error: any) {
    res.send({ err: error.message });
  }
});

export default router;
