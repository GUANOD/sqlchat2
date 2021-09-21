import app from "./appConfig";
const { Server } = require("socket.io");
import { createServer } from "http";
import { verifyTokenSocket } from "../helpers/middleware/verifyToken";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use(verifyTokenSocket);

export default io;
