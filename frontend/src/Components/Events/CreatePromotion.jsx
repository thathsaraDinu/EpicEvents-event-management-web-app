import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import MainMenu from "../MainMenu";
import Footer from "../Footer";
import getApiUrl from "../getApiUrl";

function CreatePromotion() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(0);
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [errorPage1, setErrorPage1] = useState(false);
  const [errorPage2, setErrorPage2] = useState(false);
  const apiUrl = getApiUrl();
  const [errorPage3, setErrorPage3] = useState(false);
  const [submitted, setSubmitted] = useState(0);

  const [errors, setErrors] = useState({
    bundleItems: "",
    discountAmount: "",
    discountPercentage: "",
    applicableItems: "",
    qualifyingPurchaseAmount: "",
    freeGiftItemID: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    promotionType: 0,
    storeName: "",
    bundleItems: [""],
    discountAmount: "",
    discountPercentage: "",
    applicableItems: [""],
    qualifyingPurchaseAmount: "",
    freeGiftItemID: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const resetErrors = () => {
    setErrors({
      bundleItems: "",
      discountAmount: "",
      discountPercentage: "",
      applicableItems: "",
      qualifyingPurchaseAmount: "",
      freeGiftItemID: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetFields = () => {
    setFormData({
      promotionType: 0,
      storeName: "",
      bundleItems: [""],
      discountAmount: "",
      discountPercentage: "",
      applicableItems: [""],
      qualifyingPurchaseAmount: "",
      freeGiftItemID: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleItemChange = (index, value, type) => {
    if (type == 1) {
      const items = [...formData.applicableItems];
      items[index] = value;
      setFormData({
        ...formData,
        applicableItems: items,
      });
    } else if (type == 2) {
      const items = [...formData.bundleItems];
      items[index] = value;
      setFormData({
        ...formData,
        bundleItems: items,
      });
    }
  };

  const addItem = (type) => {
    if (type == 1) {
      setFormData({
        ...formData,
        applicableItems: [...formData.applicableItems, ""],
      });
    } else if (type == 2) {
      setFormData({
        ...formData,
        bundleItems: [...formData.bundleItems, ""],
      });
    }
  };

  const removeItem = (index, type) => {
    if (type == 1) {
      const items = formData.applicableItems.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        applicableItems: items,
      });
    } else if (type == 2) {
      const items = formData.bundleItems.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        bundleItems: items,
      });
    }
  };

  const inputRefs = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      if (!formData.startDate || !formData.endDate) {
        setErrorPage3(true);
        console.log("add date");
        return;
      }
      setErrorPage3(false);
      // Add your form submission logic here
      const response = await fetch(apiUrl + "createpromotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setStep(1);
      resetFields();
      if (response.status == 200) {
        console.log("forrrrm", formData, response);

        setSubmitted(1);
      } else if (response.status == 400) {
        setSubmitted(5);
      } else {
        setSubmitted(6);
      }
    } catch (error) {
      setStep(1);
      resetFields();
      setErrorPage3(false);
      setSubmitted(2);
    }
  };
  ////////////////////////////////////////////////////////////////
  const handleEmpty = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "required" : "",
    }));
    console.log(errors);
  };

  const setNextPage = () => {
    console.log(step, method);
    if (step == 1) {
      if (!method) {
        setErrorPage1(true);
      } else {
        setFormData((prevItems) => ({
          ...prevItems,
          promotionType: method,
        }));
        resetErrors();
        setStep(step + 1);
        setErrorPage1(false);
      }
    } else {
      const filteredBundle = formData.bundleItems.filter(
        (item) => item !== null
      );

      const filteredItems = formData.applicableItems.filter(
        (item) => item !== ""
      );
      if (
        ((formData.applicableItems.length != 0 &&
          filteredItems != 0 &&
          formData.discountPercentage &&
          method == 1) ||
          (filteredBundle != 0 && formData.discountAmount && method == 2) ||
          (formData.qualifyingPurchaseAmount &&
            formData.freeGiftItemID &&
            method == 3)) &&
        formData.description
      ) {
        setStep(step + 1);
        resetErrors();
        setErrorPage2(false);
      }

      setErrorPage2(true);
      return;
    }
  };
  const setPreviousPage = () => {
    setStep(step - 1);

    setErrorPage1(false);
    setErrorPage2(false);
  };

  return (
    <div className="">
      <MainMenu></MainMenu>
      <div className="sm:px-20 px-10">
        <div className=" pt-10">
          <div className="text-3xl pt-10 font-semibold ">topic 1</div>
          <div className="text-xl pt-5 font-medium ">topic 2!</div>
        </div>
        <div className="flex justify-center">
          <div className="mt-10 w-[120vh] rounded-xl px-5 sm:px-10 py-20 pb-10 h-auto border-solid border-black border-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
              <div className="w-full px-5 sm:px-10 md:px-20 h-[4rem] lg:h-[8rem] py-">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                  <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"></div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      step == 1
                        ? "text-white  bg-gray-900"
                        : "text-white bg-gray-300"
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        id="steptext"
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          step == 1 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Step 1
                      </h6>
                      <p
                        id="steptext"
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 1 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Select Type
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      step == 2
                        ? "text-white  bg-gray-900"
                        : "text-white bg-gray-300"
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          step == 2 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Step 2
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 2 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Fill Out Information
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      step == 3
                        ? "text-white  bg-gray-900"
                        : "text-white bg-gray-300"
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          step == 3 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Step 3
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 3 ? "text-black" : "text-gray-300"
                        }`}
                      >
                        Confirm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {step == 1 && (
                <div id="firstpart" className="px-6 py-5 sm:px-10">
                  <div>
                    <label className="text-xl">label 1</label>
                  </div>
                  <div className="mt-5 flex pt-5 items-center flex-col gap-2">
                    <label>Select a Promotion type</label>
                    {errorPage1 ? (
                      <p className="font-semibold text-red-500 pt-2 text-end">
                        Please Select an option
                      </p>
                    ) : (
                      ""
                    )}
                    <select
                      name="promotionType"
                      className="mt-4 px-4 py-3 rounded-lg"
                      value={method}
                      onChange={(e) => {
                        resetFields();
                        setMethod(Number(e.target.value));

                        console.log(e.target.value);
                      }}
                    >
                      <option className="px-4 py-3" value={""}>
                        Select type
                      </option>
                      <option value={1} className="p-10">
                        Discount Percentage
                      </option>
                      <option value={2}>Bundle Deal</option>
                      <option value={3}>Free Gift Promotion</option>
                    </select>
                  </div>
                  {submitted === 1 ? (
                    <span className="text-lg text-green-600 py-5 ">
                      Promotion Creation successfull!{" "}
                    </span>
                  ) : submitted === 2 ? (
                    <span className="text-lg text-red-600 py-5 ">
                      Promotion Creation Failed!{" "}
                    </span>
                  ) : submitted === 5 ? (
                    <span className="text-lg text-red-600 py-5 ">
                      Promotion Creation Failed! Please Enter Required Fields{" "}
                    </span>
                  ) : submitted === 6 ? (
                    <span className="text-lg text-red-600 py-5 ">
                      Promotion Creation Failed! Server Error{" "}
                    </span>
                  ) : (
                    ""
                  )}

                  <div className="w-full  text-end pr-10">
                    <button
                      onClick={() => setNextPage()}
                      type="button"
                      className="mt-10 px-4 py-2 border-bluex-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step == 2 && (
                <div>
                  <div>
                    {method === 1 ? (
                      <span>Discount By Percentage</span>
                    ) : method === 2 ? (
                      <span>Bundle Deals</span>
                    ) : method === 3 ? (
                      <span>Free Gift Item</span>
                    ) : (
                      `No Type Selected ${method}`
                    )}
                  </div>
                  <div>
                    <label>Store Name:</label>
                    <input
                      className={`border-solid border-2`}
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      ref={(el) => (inputRefs.current["storeName"] = el)}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      id="inputField"
                    />
                  </div>

                  {method === 1 && (
                    <div>
                      <div>
                        <label>Discount Percentage:</label>
                        <input
                          type="number"
                          name="discountPercentage"
                          className={`border-solid border-2`}
                          ref={(el) =>
                            (inputRefs.current["discountPercentage"] = el)
                          }
                          value={formData.discountPercentage}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleEmpty(e);
                          }}
                        />
                        {errors.discountPercentage && (
                          <span className="text-sm text-red-600 font-semibold">
                            {errors.discountPercentage}
                          </span>
                        )}
                      </div>

                      <div>
                        <label>Applicable Items:</label>
                        {formData.applicableItems.map((item, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              className={`border-solid border-2`}
                              ref={(el) => (inputRefs.current[item] = el)}
                              value={item}
                              onChange={(e) => {
                                handleItemChange(index, e.target.value, 1);
                              }}
                              onBlur={(e) => {
                                handleEmpty(e);
                              }}
                              name={item}
                              required
                            />

                            <button
                              type="button"
                              onClick={() => removeItem(index, 1)}
                            >
                              Remove
                            </button>
                            {errors.applicableItems && (
                              <span className="text-sm text-red-600 font-semibold">
                                {errors.applicableItems}
                              </span>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => addItem(1)}>
                          Add Item
                        </button>
                      </div>
                    </div>
                  )}

                  {method === 2 && (
                    <div>
                      <div>
                        <label>Bundle Items:</label>
                        {formData.bundleItems.map((item, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              className={`border-solid border-2`}
                              ref={(el) => (inputRefs.current[item] = el)}
                              value={item}
                              onChange={(e) => {
                                handleItemChange(index, e.target.value, 2);
                              }}
                              onBlur={(e) => {
                                handleEmpty(e);
                              }}
                              name="bundleItems"
                              required
                            />

                            <button
                              type="button"
                              onClick={() => removeItem(index, 2)}
                            >
                              Remove
                            </button>
                            {errors.bundleItems && (
                              <span className="text-sm text-red-600 font-semibold">
                                {errors.bundleItems}
                              </span>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            addItem(2);
                          }}
                        >
                          Add Item
                        </button>
                      </div>
                      <div>
                        <label>Discount Amount:</label>
                        <input
                          type="number"
                          name="discountAmount"
                          className={`border-solid border-2`}
                          ref={(el) =>
                            (inputRefs.current["discountAmount"] = el)
                          }
                          value={formData.discountAmount}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleEmpty(e);
                          }}
                        />
                        {errors.discountAmount && (
                          <span className="text-sm text-red-600 font-semibold">
                            {errors.discountAmount}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {method === 3 && (
                    <div>
                      <div>
                        <label>Qualifying Purchase Amount</label>
                        <input
                          type="number"
                          name="qualifyingPurchaseAmount"
                          className={`border-solid border-2`}
                          ref={(el) =>
                            (inputRefs.current["qualifyingPurchaseAmount"] = el)
                          }
                          value={formData.qualifyingPurchaseAmount}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleEmpty(e);
                          }}
                        />
                        {errors.qualifyingPurchaseAmount && (
                          <span className="text-sm text-red-600 font-semibold">
                            {errors.qualifyingPurchaseAmount}
                          </span>
                        )}
                      </div>
                      <div>
                        <label>Free Gift Item ID</label>
                        <input
                          type="text"
                          name="freeGiftItemID"
                          className={`border-solid border-2`}
                          ref={(el) =>
                            (inputRefs.current["freeGiftItemID"] = el)
                          }
                          value={formData.freeGiftItemID}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleEmpty(e);
                          }}
                        />
                        {errors.freeGiftItemID && (
                          <span className="text-sm text-red-600 font-semibold">
                            {errors.freeGiftItemID}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label>Description:</label>
                    <textarea
                      type="text"
                      name="description"
                      className={`border-solid border-2`}
                      ref={(el) => (inputRefs.current["description"] = el)}
                      value={formData.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleEmpty(e);
                      }}
                    />
                    {errors.description && (
                      <span className="text-sm text-red-600 font-semibold">
                        {errors.description}
                      </span>
                    )}
                  </div>
                  {errorPage2 ? (
                    <p className="font-semibold text-red-500 pt-5 text-end">
                      Please Fill the Required Fields
                    </p>
                  ) : (
                    ""
                  )}

                  <div className="sm:mt-10 mt-5  flex flex-wrap justify-center sm:justify-end gap-5 w-full text-end ">
                    <button
                      onClick={() => setPreviousPage()}
                      type="button"
                      className="  px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setNextPage()}
                      type="button"
                      className=" px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step == 3 && (
                <div>
                  <div>
                    {method === 1 ? (
                      <span>Discount By Percentage</span>
                    ) : method === 2 ? (
                      <span>Bundle Deals</span>
                    ) : method === 3 ? (
                      <span>Free Gift Item</span>
                    ) : (
                      "No Type Selected"
                    )}
                  </div>
                  <div>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      className={`border-solid border-2`}
                      ref={(el) => (inputRefs.current["startDate"] = el)}
                      onBlur={(e) => {
                        handleEmpty(e);
                      }}
                      value={formData.startDate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>

                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      className={`border-solid border-2`}
                      ref={(el) => (inputRefs.current["endDate"] = el)}
                      onBlur={(e) => {
                        handleEmpty(e);
                      }}
                      value={formData.endDate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  {errorPage3 ? (
                    <p className="font-semibold text-red-500 pt-5  text-end">
                      Please Fill the Required Fields
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="sm:mt-10 mt-5 w-full flex flex-wrap justify-center sm:justify-end gap-5 sm:text-end ">
                    <button
                      onClick={() => setPreviousPage()}
                      type="button"
                      className="  px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className=" px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CreatePromotion;
