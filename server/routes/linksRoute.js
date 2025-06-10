import express from "express";
import {
  addLocation,
  addSocial,
  deleteSocial,
  editLocation,
  editSocial,
  getLocation,
  getSocial,
} from "../controllers/linksController.js";

const linkRouter = express.Router();

linkRouter.post("/add-social", addSocial);
linkRouter.get("/get-social", getSocial);
linkRouter.delete("/delete-social/:id", deleteSocial);
linkRouter.put("/update-social/:id", editSocial);
linkRouter.post("/add-location", addLocation);
linkRouter.get("/get-location", getLocation);
linkRouter.patch("/update-location/:id", editLocation);

export default linkRouter;
