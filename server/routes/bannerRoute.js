import express from "express";
import upload from "../middleware/upload.js";
import {
  addBanner,
  deleteBanner,
  getBanner,
} from "../controllers/bannerController.js";

const bannerRouter = express.Router();

bannerRouter.post("/", upload.single("image"), addBanner);
bannerRouter.get("/", getBanner);
bannerRouter.delete("/:id", deleteBanner);

export default bannerRouter;
