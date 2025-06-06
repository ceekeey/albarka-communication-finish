import Banner from "./../models/Banner.js";
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
    res
      .status(201)
      .json({ message: "Banner added successfully", banner: newBanner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error rr" });
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
