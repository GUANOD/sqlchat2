import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

export default app;
