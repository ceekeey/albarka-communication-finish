import Category from "../models/CategoryModel.js";
import Stock from "../models/StockModel.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  // Validate category ID
  if (!id) {
    return res.status(400).json({
      error: "Category ID is required",
    });
  }

  try {
    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    console.log(`Found category: ID=${category._id}, Name=${category.name}`);

    // Find and log all stock items associated with the category
    const stockItems = await Stock.find({ catigoryid: id });
    console.log(`Found ${stockItems.length} stock items for category ID=${id}`);

    // Track and delete images for stock items
    for (const stock of stockItems) {
      console.log(
        `Processing stock item: ID=${stock._id}, Name=${stock.name}, Image=${
          stock.image || "None"
        }`
      );

      if (stock.image) {
        // Construct the image path
        // Handle both cases: image as filename or full path
        const imagePath = stock.image.includes("uploads/")
          ? path.join(__dirname, "../", stock.image) // If image includes 'uploads/'
          : path.join(__dirname, "../Uploads", stock.image); // If image is just filename

        console.log(`Attempting to delete image at: ${imagePath}`);

        try {
          await fs.access(imagePath); // Check if the file exists
          await fs.unlink(imagePath); // Delete the image file
          console.log(`Successfully deleted image: ${imagePath}`);
        } catch (err) {
          console.warn(
            `Failed to delete image at ${imagePath}: ${err.message}`
          );
          // Continue even if image deletion fails
        }
      } else {
        console.log(`No image to delete for stock item: ID=${stock._id}`);
      }
    }

    // Delete all stock items associated with the category
    console.log(
      `Deleting ${stockItems.length} stock items for category ID=${id}`
    );
    await Stock.deleteMany({ catigoryid: id });

    // Delete category image (if it exists)
    if (category.image) {
      console.log(`Category image field: ${category.image}`);
      const categoryImagePath = category.image.includes("uploads/")
        ? path.join(__dirname, "../", category.image)
        : path.join(__dirname, "../Uploads", category.image);
      console.log(
        `Attempting to delete category image at: ${categoryImagePath}`
      );

      try {
        await fs.access(categoryImagePath); // Check if the file exists
        await fs.unlink(categoryImagePath); // Delete the category image file
        console.log(
          `Successfully deleted category image: ${categoryImagePath}`
        );
      } catch (err) {
        console.warn(
          `Failed to delete category image at ${categoryImagePath}: ${err.message}`
        );
      }
    } else {
      console.log(`No image for category: ID=${category._id}`);
    }

    // Delete the category
    console.log(`Deleting category: ID=${category._id}`);
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category and associated stock items deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category and stock:", error);
    return res.status(500).json({
      error: "Error deleting category and associated stock",
    });
  }
};
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "Name and description are required",
    });
  }
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating category",
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    // Get all categories
    const categories = await Category.find();

    // For each category, get the count of products under it
    const categoriesWithProductCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Stock.countDocuments({
          catigoryid: category._id,
        });
        return {
          ...category.toObject(),
          productCount,
        };
      })
    );

    res.status(200).json({
      message: "All categories retrieved successfully",
      data: categoriesWithProductCount,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving categories",
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Category ID is required",
    });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    res.status(200).json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving category",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    if (!id || !name || !description) {
      return res.status(400).json({
        error: "Category ID, name, and description are required",
      });
    }
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating category",
    });
  }
};
