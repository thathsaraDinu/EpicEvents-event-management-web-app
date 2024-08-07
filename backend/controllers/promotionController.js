const discount = require("../models/DiscountPercentageModel");
const freeGift = require("../models/FreeGiftWithPurchaseModel");
const bundleDeal = require("../models/BundleDealModel");

const createPromotion = async (req, res) => {
  try {
    console.log("test 0");
    const {
      promotionType: promotionType,
      storeName: storeName,
      bundleItems: bundleItems,
      discountAmount: discountAmount,
      startDate: startDate,
      endDate: endDate,
      description: description,
      discountPercentage: discountPercentage,
      applicableItems: applicableItems,
      qualifyingPurchaseAmount: qualifyingPurchaseAmount,
      freeGiftItemID: freeGiftItemID,
    } = req.body;
    console.log(req.body);
    console.log("test 1");
    if (!startDate || !endDate || !description || !storeName)
      return res.status(400).json({ message: "Please enter required fields" });

    let isActive;
    console.log("test 2");
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now >= start && now <= end) {
      isActive = true;
    } else {
      isActive = false;
    }
    console.log("test 3");
    let newPromotion;

    if (promotionType == 1) {
      console.log("test - inside promotion type select");
      if (!discountPercentage || !applicableItems)
        return res
          .status(400)
          .json({ message: "Please enter discount required fields" });

      newPromotion = new discount({
        promotionType: "Discount Percentage",
        storeName,
        discountPercentage,
        applicableItems,
        startDate,
        endDate,
        description,
        isActive,
      });
      console.log("test discount newPromotion created");
    } else if (promotionType == 2) {
      if (!bundleItems || !discountAmount)
        return res
          .status(400)
          .json({ message: "Please enter bundleDeal required fields" });

      newPromotion = new bundleDeal({
        promotionType: "Bundle Deal",
        storeName,
        bundleItems,
        discountAmount,
        startDate,
        endDate,
        description,
        isActive,
      });
      console.log("test bundle new Promotion created");
    } else if (promotionType == 3) {
      if (!qualifyingPurchaseAmount || !freeGiftItemID)
        return res
          .status(400)
          .json({ message: "Please enter FreeGift required fields" });

      newPromotion = new freeGift({
        promotionType: "Free Gift",
        storeName,
        qualifyingPurchaseAmount,
        freeGiftItemID,
        startDate,
        endDate,
        description,
        isActive,
      });

      console.log("test free gift newPromotion created");
    } else {
      return res.json({ message: "invalid promotion type" });
    }
    const savedPromotion = await newPromotion.save();
    console.log("test 4 saved and finished");

    return res.status(200).json({ savedprom: savedPromotion });
  } catch (error) {
    res.status(500).json({ message: "failed, internal error" });
  }
};

exports.createPromotion = createPromotion;
