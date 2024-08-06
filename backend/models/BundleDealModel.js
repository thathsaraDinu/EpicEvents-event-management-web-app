const mongoose = require("mongoose");

const BundleDealSchema = new mongoose.Schema({
  promotionType: {
    type: String,
    enum: ["Bundle Deal"],
    default: "Bundle Deal",
  },
  storeName: {
    type: String,
    required: true,
  },
  bundleItems: [
    {
      itemID: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  discountAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("BundleDeal", BundleDealSchema);
