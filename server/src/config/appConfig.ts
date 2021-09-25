import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

export default app;
