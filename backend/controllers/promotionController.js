const discount = require("../models/DiscountPercentageModel");
const freeGift = require("../models/FreeGiftWithPurchaseModel");
const bundleDeal = require("../models/BundleDealModel");

const createPromotion = async (req, res) => {
  try {
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
console.log(req.body)
    console.log("test 1");
    if (!startDate || !endDate || !description || !storeName)
      return res.status(400).json("Please enter required fields");

    let isActive;
    console.log("test 2");

    const now = new Date();
    if (now >= startDate && now <= endDate) {
      isActive = true;
    } else {
      isActive = false;
    }
    console.log("test 3");

    if (promotionType == 1) {
      if (!discountPercentage || !applicableItems)
        return res.status(400).json("Please enter discount required fields");

      const newPromotion = new discount({
        promotionType: "Discount Percentage",
        storeName,
        discountPercentage,
        applicableItems,
        startDate,
        endDate,
        description,
        isActive,
      });

      const savedPromotion = await newPromotion.save();

      res.status(200).json({ status: 200, savedPromotion });
    } else if (promotionType == 2) {
      if (!bundleItems || !discountAmount)
        return res.status(400).json("Please enter bundleDeal required fields");

      const newPromotion = new bundleDeal({
        promotionType: "Bundle Deal",
        storeName,
        bundleItems,
        discountAmount,
        startDate,
        endDate,
        description,
        isActive,
      });

      const savedPromotion = await newPromotion.save();

      res.status(200).json({ status: 200, savedPromotion });
    } else if (promotionType == 3) {
      if (!qualifyingPurchaseAmount || !freeGiftItemID)
        return res.status(400).json("Please enter FreeGift required fields");

      const newPromotion = new freeGift({
        promotionType: "Free Gift",
        storeName,
        qualifyingPurchaseAmount,
        freeGiftItemID,
        startDate,
        endDate,
        description,
        isActive,
      });

      const savedPromotion = await newPromotion.save();

      res.status(200).json({ status: 200, savedPromotion });
    }
    else{
        return res.json("invalid promotion type");
    }
  } catch (error) {}
};

exports.createPromotion = createPromotion;