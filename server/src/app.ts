require("dotenv").config();
import app from "./config/appConfig";
import connexionRoute from "./routes/connexionRoute";
import userRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";
import contactRoute from "./routes/contactRoute";
import { usersConnected } from "./helpers/searchArray";

import { socketConnection } from "./routes/socketRoutes/socketConnection";
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { createServer } from "http";
import { verifyTokenSocket } from "./helpers/middleware/verifyToken";
import { ConnectedUser } from "./types/types";
import { addMessage } from "./api/messageDb";
import { Message } from "./models/Message";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// io.use(verifyTokenSocket);

app.use("/", connexionRoute);
app.use("/user", userRoute);
app.use("/message", messageRoute);
app.use("/contact", contactRoute);
app.use("*", (req, res) => {
  res.status(404).send({ res: "Not found" });
});

// console.log(io);

io.on("connection", (socket: any) => {
  const id = socket.handshake.query.id;
  if (!usersConnected.has(id)) {
    usersConnected.set(id, socket.id);
  }
  console.log("users", usersConnected);

  socket.on("emit", async (data: any) => {
    console.log(data);
    try {
      const date = new Date();
      const dateFormat = date.toISOString().slice(0, 19).replace("T", " ");

      await addMessage(new Message(data.msg, id, data.receiver_ID, dateFormat));
      console.log(data.receiver_ID);
      const receiverSocketId: string | undefined = usersConnected.get(
        data.receiver_ID
      );
      // console.log(receiverSocketId);

      if (receiverSocketId) {
        console.log("found");
        io.to(receiverSocketId).emit("newMessage", {
          chat: data.msg,
          sender_ID: id,
          receiver_ID: data.receiver_ID,
          dateFormat,
        });
      }
    } catch (error: any) {}
  });

  socket.on("disconnect", () => {
    usersConnected.delete(socket.handshake.query.id);
  });
});

server.listen(8080, () => console.log("listening"));
