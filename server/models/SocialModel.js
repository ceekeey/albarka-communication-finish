import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  icon: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
});

const Social = mongoose.model("Social", socialSchema);
export default Social;
