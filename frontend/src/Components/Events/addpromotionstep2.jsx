import { useState } from "react";

export function AddPromotionStep2({
  promotionType,
  storeName,
  discountAmount,
  discountPercentage,
  applicableItems,
  qualifyingPurchaseAmount,
  description,
  handleChange,
  addItem,
  removeItem,
  handleItemChange,
}) {
  const updateFields = (fields) => {
    handleChange(fields);
  };

  return (
    <div className="  transition-all duration-500">
      <div>
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
      </div>
      <div>
        <label>Store Name:</label>
        <input
          className={`border-solid border-2`}
          type="text"
          name="storeName"
          value={storeName}
          id="inputField"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <div>
          <label>
            {promotionType == 1
              ? "Discount Percentage"
              : "Qualifying Purchase Amount"}
          </label>
          <input
            type="number"
            name={
              promotionType == 1
                ? "discountPercentage"
                : "qualifyingPurchaseAmount"
            }
            className="border-solid border-2"
            value={
              promotionType == 1 ? discountPercentage : qualifyingPurchaseAmount
            }
            onChange={(e) => handleChange(e)}
            max={promotionType === 1 ? 100 : undefined} // max is only relevant for discountPercentage
          />
          <span className="text-sm text-red-600 font-semibold"></span>
        </div>
        {promotionType == 1 ? (
          <div>
            <label>Applicable Items:</label>
            {applicableItems.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  className={`border-solid border-2`}
                  value={item}
                  onChange={(e) => {
                    handleItemChange(index, e.target.value, 1);
                  }}
                  name="applicableItems"
                  required
                />

                <button type="button" onClick={() => removeItem(index, 1)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(1)}>
              Add Item
            </button>
          </div>
        ) : (
          <div>
            <label>Discount Amount</label>
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              name="discountAmount"
              className={`border-solid border-2`}
              value={discountAmount}
            />
          </div>
        )}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          onChange={(e) => handleChange(e)}
          name="description"
          className={`border-solid border-2`}
          value={description}
        />
      </div>
      <div className="h-5"></div>
    </div>
  );
}
