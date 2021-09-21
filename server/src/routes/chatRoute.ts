import express from "express";
import { verifyTokenHttp } from "../helpers/middleware/verifyToken";
const router = express.Router();

// router.get("/", verifyTokenHttp, (req, res) => {
//   res.send("user chat");
// });

export default router;
