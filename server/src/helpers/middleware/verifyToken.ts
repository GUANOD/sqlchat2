import { NextFunction, Response, Request } from "express";
const jwt = require("jsonwebtoken"); // ¯\_(ツ)_/¯

export function verifyTokenHttp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.cookies.token;
  console.log("req.cookie", req.cookies.token);
  const token = bearerHeader && (<string>bearerHeader).split(" ")[1];
  console.log(token);
  if (token == null) {
    res.status(401).send({ err: "Unauthorized" });
    return;
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error: Error, user: any) => {
      if (error) {
        console.error(error);
        res.status(401).send({ err: "Unauthorized" });
        return;
      } else {
        req.user = user.user;
        console.log("verified");
        console.log("going next");
        next();
      }
    }
  );
}

export function verifyTokenSocket(socket: any, next: NextFunction) {
  console.log(socket.handshake.query.id);
  if (socket.handshake.query && socket.handshake.query.token) {
    const bearerHeader = socket.handshake.query.token;
    const token = bearerHeader && (<string>bearerHeader).split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err: Error, user: any) {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.decoded = user;
        console.log("going next");
        next();
        console.log("didnt go next");
      }
    );
  }
}
