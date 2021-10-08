import { Socket } from "socket.io";

export interface ConnectedUser {
  id: string;
  socket: string;
}
