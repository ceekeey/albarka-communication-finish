import Contact from "./../models/ContactModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message, phone, productId } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required." });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      productId: productId || null,
    });

    await contact.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .populate("productId", "name image");
    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(500).json({ error: "Server Error n" });
  }
};
