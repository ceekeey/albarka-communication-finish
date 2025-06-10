import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  icon: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
