const discount = require("../models/DiscountPercentageModel");
const freeGift = require("../models/FreeGiftWithPurchaseModel");
const bundleDeal = require("../models/BundleDealModel");

const createPromotion = async (req, res) => {
  try {
    console.log("test 0");
    const {
      promotionType: promotionType,
      storeName: storeName,
      startDate: startDate,
      endDate: endDate,
      description: description,
      discountPercentage: discountPercentage,
      applicableItems: applicableItems,
      qualifyingPurchaseAmount: qualifyingPurchaseAmount,
      discountAmount: discountAmount,
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

    const checkDate = (date) => {
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid Date" });
      } else {
        console.log({ message: `${date} date is valid.` });
      }
    };

    checkDate(start);
    checkDate(end);

    if (now >= start && now <= end) {
      isActive = true;
    } else {
      isActive = false;
    }

    console.log("test 3");
    let newPromotion;

    if (promotionType === 1) {
      console.log("test - inside promotion type select");
      if (
        (discountPercentage <= 0 && discountPercentage > 100) ||
        !applicableItems
      )
        return res.status(400).json({ message: "Invalid Inputs" });

      newPromotion = new discount({
        promotionType: 1,
        storeName,
        discountPercentage,
        applicableItems,
        startDate: start,
        endDate: end,
        description,
        isActive,
      });
      console.log("test discount newPromotion created");
    } else if (promotionType === 3) {
      if (qualifyingPurchaseAmount <= 0 || discountAmount <= 0)
        return res.status(400).json({ message: "Invalid Inputs" });

      newPromotion = new freeGift({
        promotionType: 3,
        storeName,
        qualifyingPurchaseAmount,
        discountAmount,
        startDate: start,
        endDate: end,
        description,
        isActive,
      });

      console.log("test discount amount newPromotion created");
    } else {
      return res.json({ message: "invalid promotion type" });
    }
    const savedPromotion = await newPromotion.save();
    console.log("test 4 saved and finished");

    return res.status(200).json({ savedprom: savedPromotion });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed, internal error" });
    }
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const promotions = await discount.find();
    return res.json(promotions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllFreeGifts = async (req, res) => {
  try {
    const promotions = await freeGift.find();
    return res.json(promotions);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.createPromotion = createPromotion;
exports.getAllDiscounts = getAllDiscounts;
exports.getAllFreeGifts = getAllFreeGifts;
