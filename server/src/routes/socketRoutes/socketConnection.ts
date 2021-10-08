import { Socket } from "socket.io";

export const socketConnection = (socket: Socket, err: Error) => {
  console.log("I am a connected socket");
  console.log(socket);
  console.log("connnagwsjygfasef", socket.handshake.query.id);
};
