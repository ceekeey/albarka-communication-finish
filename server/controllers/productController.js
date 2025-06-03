import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import Stock from "../models/StockModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteStock = async (req, res) => {
  const { id } = req.params;

  // Validate stock ID
  if (!id) {
    return res.status(400).json({ error: "Stock ID is required" });
  }

  try {
    // Find the stock item
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ error: "Stock item not found" });
    }
    console.log(
      `Found stock item: ID=${stock._id}, Name=${stock.name}, Image=${
        stock.image || "None"
      }`
    );

    // Delete the associated image if it exists
    if (stock.image) {
      // Construct the image path
      const imagePath = stock.image.includes("uploads/")
        ? path.join(__dirname, "../", stock.image) // If image includes 'uploads/'
        : path.join(__dirname, "../Uploads", stock.image); // If image is just filename
      console.log(`Attempting to delete image at: ${imagePath}`);

      try {
        await fs.access(imagePath); // Check if the file exists
        await fs.unlink(imagePath); // Delete the image file
        console.log(`Successfully deleted image: ${imagePath}`);
      } catch (err) {
        console.warn(`Failed to delete image at ${imagePath}: ${err.message}`);
        // Continue even if image deletion fails
      }
    } else {
      console.log(`No image to delete for stock item: ID=${stock._id}`);
    }

    // Delete the stock item
    console.log(`Deleting stock item: ID=${stock._id}`);
    await Stock.findByIdAndDelete(id);

    return res.status(200).json({ message: "Stock item deleted successfully" });
  } catch (error) {
    console.error("Error deleting stock item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addStock = async (req, res) => {
  const { name, description, categoryId, quantity, periority } = req.body;
  let image = "";

  try {
    if (req.file) {
      const uploadFolder = path.join("uploads");
      const originalPath = req.file.path;
      const compressedFilename = "compressed-" + req.file.filename;
      const compressedPath = path.join(uploadFolder, compressedFilename);

      // Compress using sharp
      await sharp(originalPath)
        .resize({ width: 1024 }) // optional: resize large images
        .jpeg({ quality: 75 }) // adjust quality to reduce size
        .toFile(compressedPath);

      // Delete the original uncompressed image using async fs
      try {
        await fs.unlink(originalPath);
        console.log(`Original image deleted: ${originalPath}`);
      } catch (unlinkErr) {
        console.warn(`Failed to delete original image: ${unlinkErr.message}`);
      }

      // Set image path for DB
      image = `/uploads/${compressedFilename}`;
    }

    // Save stock to DB
    const stock = new Stock({
      name,
      description,
      image,
      periority,
      quantity,
      catigoryid: categoryId,
    });

    const savedStock = await stock.save();

    res.status(201).json({
      message: "Stock added successfully",
      data: savedStock,
    });
  } catch (error) {
    console.error("Add Stock Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getStock = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res
      .status(200)
      .json({ message: "All stocks fetched successfully", data: stocks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(9) // Limit to 10 results
      .populate("catigoryid", "name");
    res
      .status(200)
      .json({ message: "Recent 9 stocks fetched successfully", data: stocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStocksUser = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .sort({ periority: -1 }) // Sort by most recent
      .limit(9) // Limit to 10 results
      .populate("catigoryid", "name");
    res
      .status(200)
      .json({ message: "All stocks fetched successfully", data: stocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStocksAdmin = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const stocks = await Stock.find({ catigoryid: categoryId }).populate(
      "catigoryid",
      "name"
    );
    res
      .status(200)
      .json({ message: "All stocks fetched successfully", data: stocks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateStock = async (req, res) => {
  const { id } = req.params;

  // Extract fields from FormData
  const { name, description, categoryId, quantity, periority } = req.body;
  const image = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.image || "";

  // Validate required fields
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  try {
    // Check if stock exists
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Prepare update object
    const updateData = {
      name,
      description,
      quantity,
      periority,
      ...(image && { image }), // Only update image if provided
      ...(categoryId && { categoryId }), // Update categoryId if provided
      // Status is optional; only include if provided
      // ...(req.body.status && { status: req.body.status }),
    };

    // Update stock item
    const updatedStock = await Stock.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validators run
    });

    res.status(200).json({
      message: "Stock updated successfully",
      stock: updatedStock, // Return updated stock for frontend
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
