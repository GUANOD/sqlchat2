import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user connected");
});

router.get("/sub", (req, res) => {
  res.send("UserCreated");
});

export default router;
