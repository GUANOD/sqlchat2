import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest as Request } from "../../models/IGetUserAuthInfoRequest.ts";
const jwt = require("jsonwebtoken"); // ¯\_(ツ)_/¯

export function verifyTokenHttp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers["auth-token"];
  const token = bearerHeader && (<string>bearerHeader).split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: Error, user: any) => {
      if (err) {
        res.status(403).send({ res: "Unauthorized" });
      } else {
        req.user = user;
        console.log("verified");
      }
    }
  );
  next();
}

export function verifyTokenSocket(socket: any, next: NextFunction) {
  if (socket.handshake.query && socket.handshake.query.token) {
    const bearerHeader = socket.handshake.query.token;
    const token = bearerHeader && (<string>bearerHeader).split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err: Error, user: any) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = user;
        next();
      }
    );
  }
}
