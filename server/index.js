import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import productRouter from "./routes/productRoute.js";
import connectDb from "./db/config.js";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// send index file on root request
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/stock", productRouter);
app.use("/api/catigory", categoryRouter);

app.listen(5000, () => {
  console.log("server running");
  connectDb();
});
