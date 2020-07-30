const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    point: Number,
    message: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    brand: String,
    category: {
      type: String,
      required: true,
    },
    modelNo: String,
    color: String,
    size: String,
    manuDate: Date,
    expiryDate: Date,
    status: {
      type: String,
      enum: ["available", "sold", "out of stock"],
      default: "available",
    },
    images: [String],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    tags: [String],
    discount: {
      discountedItem: Boolean,
      discountType: String,
      discount: String,
    },
    warranty: {
      warrantyItem: Boolean,
      warrantyPeriod: String,
    },
    offers: [String],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
