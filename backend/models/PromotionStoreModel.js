const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  promotions: [P],
});

module.exports = mongoose.model("Promotion", PromotionSchema);
