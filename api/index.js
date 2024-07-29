import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import router from "./routes/userRoute.js";
import mongoose from "mongoose";
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("data base connected successfully"))
  .catch((err) => console.log("somthing went wrong", err));
app.use(express.json());
app.use("/api/auth", router);
app.listen(PORT, () => console.log(`app is litening on port ${PORT}`));
