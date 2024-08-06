const mongoose = require("mongoose");

const FreeGiftWithPurchaseSchema = new mongoose.Schema({
  promotionType: {
    type: String,
    enum: ["Free Gift with Purchase"],
    default: "Free Gift with Purchase",
  },
  storeName: {
    type: String,
    required: true,
  },
  qualifyingPurchaseAmount: {
    type: Number,
    required: true,
  },
  freeGiftItemID: {
    type: String,
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

module.exports = mongoose.model(
  "FreeGiftWithPurchase",
  FreeGiftWithPurchaseSchema
);
