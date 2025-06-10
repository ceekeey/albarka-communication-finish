import Social from "../models/SocialModel.js";
import Location from "../models/LocationModel.js";

export const addSocial = async (req, res) => {
  const { icon, link } = req.body;

  if (!icon || !link) {
    return res.status(400).json({ error: "Icon and link are required." });
  }

  try {
    // Check if the link already exists
    const existing = await Social.findOne({ icon });

    if (existing) {
      return res
        .status(409)
        .json({ error: "This social link already exists." });
    }

    const social = new Social({ icon, link });
    await social.save();

    res.status(200).json({ message: "Link added successfully." });
  } catch (error) {
    console.error("Error adding social link:", error);
    res.status(500).json({ error: "Failed to add social media link." });
  }
};

export const getSocial = async (req, res) => {
  try {
    const socialLinks = await Social.find(); // Fetch all social links
    res.status(200).json(socialLinks); // Use 200 for successful GET
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch social media links" }); // Use 500 for server errors
  }
};

export const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    await Social.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
  }
};

export const editSocial = async (req, res) => {
  const { id } = req.params;
  const { icon, link } = req.body;

  if (!icon || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedSocial = await Social.findByIdAndUpdate(
      id,
      { icon, link },
      { new: true } // return the updated document
    );

    if (!updatedSocial) {
      return res.status(404).json({ message: "Social link not found" });
    }

    res.json({
      message: "Social link updated successfully",
      data: updatedSocial,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// locations
export const addLocation = async (req, res) => {
  const social = new Location({ icon: "location", link: "abuja" });
  await social.save();
  res.status(200).json({ message: "Location added successfully." });
};

export const getLocation = async (req, res) => {
  try {
    const locationsLink = await Location.find(); // Fetch all social links
    res.status(200).json(locationsLink); // Use 200 for successful GET
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Location links" }); // Use 500 for server errors
  }
};

export const editLocation = async (req, res) => {
  const { id } = req.params;
  const { icon, link } = req.body;

  if (!icon || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedSocial = await Location.findByIdAndUpdate(
      id,
      { icon, link },
      { new: true } // return the updated document
    );

    if (!updatedSocial) {
      return res.status(404).json({ message: "Location link not found" });
    }

    res.json({
      message: "Location link updated successfully",
      data: updatedSocial,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
