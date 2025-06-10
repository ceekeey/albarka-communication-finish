import Banner from "./../models/Banner.js";
import path from "path";
import { unlink } from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newBanner = new Banner({
      title,
      subtitle,
      imageUrl,
    });

    await newBanner.save();
    res.status(201).json({ message: "Banner added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: "Server Error dd" });
  }
};

// DELETE route to delete a banner and its image
export const deleteBanner = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    // Delete the associated image file
    const imagePath = path.join(__dirname, "..", banner.imageUrl);
    try {
      await unlink(imagePath);
      console.log(`Deleted image file: ${imagePath}`);
    } catch (fileError) {
      if (fileError.code === "ENOENT") {
        console.warn(`Image file not found: ${imagePath}`);
      } else {
        console.error(`Error deleting image file: ${fileError.message}`);
      }
      // Continue with response even if file deletion fails
    }

    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting banner",
    });
  }
};
