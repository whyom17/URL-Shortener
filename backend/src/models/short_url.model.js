import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  clicks: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;