import express from "express";
import { getContacts, sendMessage } from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/", sendMessage);
contactRouter.get("/", getContacts);

export default contactRouter;
