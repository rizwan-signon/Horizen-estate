import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import error from "./middlewares/error.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
import router from "./routes/authRoute.js";
import listingRoute from "./routes/listing.route.js";
import userUpdate from "./routes/user.js";
import mongoose from "mongoose";
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("data base connected successfully"))
  .catch((err) => console.log("somthing went wrong", err));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router);
app.use("/api/user", userUpdate);
app.use("/api/user", listingRoute);
app.listen(PORT, () => console.log(`app is litening on port ${PORT}`));
app.use(error);
