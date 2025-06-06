import express from "express";
import upload from "../middleware/upload.js";
import { addBanner, getBanner } from "../controllers/bannerController.js";

const bannerRouter = express.Router();

bannerRouter.post("/", upload.single("image"), addBanner);
bannerRouter.get("/", getBanner);

export default bannerRouter;
