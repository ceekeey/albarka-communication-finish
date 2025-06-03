import express from "express";

const categoryRouter = express.Router();
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/catigoryController.js";

categoryRouter.post("/add-catigory", createCategory);
categoryRouter.get("/all-catigory", getAllCategories);
categoryRouter.get("/catigory/:id", getCategoryById);
categoryRouter.put("/update-catigory/:id", updateCategory);
categoryRouter.delete("/delete-catigory/:id", deleteCategory);

export default categoryRouter;
