import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  location: String
});

const urlSchema = new mongoose.Schema({
  shortcode: { type: String, unique: true },
  url: String,
  expiry: {
    type:Date,
    expires:0
  },
  clicks: [clickSchema],
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }


}, { timestamps: true });

export default mongoose.model("Url", urlSchema);
