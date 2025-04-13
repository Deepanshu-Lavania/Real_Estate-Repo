import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before anything else

import express from "express";
import authRouter from "./Router/auth-router.js";
import { connectDB } from "./utils/db.js";

const app = express();
const port = process.env.PORT || 9000;

app.use("/", authRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error:", err);
  });
