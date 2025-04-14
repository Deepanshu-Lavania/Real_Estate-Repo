import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before anything else

import express from "express";
import userRoute from "./Router/user-route.js";
import authRoute from "./Router/auth-route.js"
import { connectDB } from "./utils/db.js";
import errorHandler from "./middleware/Errro-Middleware.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 9000;

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

// 👇 Place after all routes
app.use(errorHandler)

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error:", err);
  });
