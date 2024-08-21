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
  register,
  errors,
}) {
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
          {...register("storeName", {
            onChange: (e) => {
              handleChange(e);
              // Update state
            },
          })}
          id="inputField"
        />
        <div>{errors.storeName && <p>{errors.storeName.message}</p>}</div>
      </div>

      <div>
        <div>
          <label>
            {promotionType == 1
              ? "Discount Percentage"
              : "Qualifying Purchase Amount"}
          </label>

          <input
            type="text"
            {...register(
              promotionType == 1
                ? "discountPercentage"
                : "qualifyingPurchaseAmount",
              {
                onChange: (e) => {
                  handleChange(e);
                  // Update state
                },
              }
            )}
            name={
              promotionType == 1
                ? "discountPercentage"
                : "qualifyingPurchaseAmount"
            }
            className="border-solid border-2"
            value={
              promotionType == 1 ? discountPercentage : qualifyingPurchaseAmount
            }
            max={promotionType === 1 ? 100 : undefined} // max is only relevant for discountPercentage
          />

          <div>
            {promotionType == 1 && errors.discountPercentage ? (
              <p>{errors.discountPercentage.message}</p>
            ) : promotionType == 3 && errors.qualifyingPurchaseAmount ? (
              <p>{errors.qualifyingPurchaseAmount.message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        {promotionType == 1 ? (
          <div>
            <label>Applicable Items:</label>
            {applicableItems.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="border-solid border-2"
                  {...register(`applicableItems.${index}`, {
                    required: true,
                    onChange: (e) => handleItemChange(index, e.target.value, 1),
                  })}
                  value={item}
                  name={`applicableItems[${index}]`}
                />

                <button type="button" onClick={() => removeItem(index, 1)}>
                  Remove
                </button>
                <div>
                  {errors.applicableItems && errors.applicableItems[index] && (
                    <p>{errors.applicableItems[index].message}</p>
                  )}
                </div>
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
              type="number"
              {...register("discountAmount", {
                onChange: (e) => {
                  handleChange(e);
                  // Update state
                },
              })}
              name="discountAmount"
              className={`border-solid border-2`}
              value={discountAmount}
            />
            <div>
              {errors.discountAmount && <p>{errors.discountAmount.message}</p>}
            </div>
          </div>
        )}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          {...register("description", {
            onChange: (e) => {
              handleChange(e);
              // Update state
            },
          })}
          className={`border-solid border-2`}
          value={description}
        />
        <div>{errors.description && <p>{errors.description.message}</p>}</div>
      </div>
      <div className="h-5"></div>
    </div>
  );
}
