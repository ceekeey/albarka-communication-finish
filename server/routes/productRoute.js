import express from "express";
import {
  addStock,
  deleteStock,
  getAllStocks,
  getAllStocksAdmin,
  getAllStocksUser,
  getStock,
  getStocksByCategory,
  updateStock,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const productRouter = express.Router();

productRouter.get("/all-stock", getAllStocks);
productRouter.get("/all-stock-products", getAllStocksUser);
productRouter.get("/stocks-by-category/:categoryId", getStocksByCategory);
productRouter.get("/stats", getAllStocks);
productRouter.get("/all-stock-admin/:categoryId", getAllStocksAdmin);
productRouter.get("/stock/:id", getStock);
productRouter.post("/add-stock", upload.single("image"), addStock);
productRouter.delete("/delete-stock/:id", deleteStock);
productRouter.put("/update-stock/:id", upload.single("image"), updateStock);

export default productRouter;
