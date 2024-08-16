import React, { useState } from "react";
import MainMenu from "../MainMenu";
import Footer from "../Footer";
import getApiUrl from "../getApiUrl";

function CreatePromotion() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(0);
  const [errorPage, setErrorPage] = useState(0);
  const apiUrl = getApiUrl();

  const [submitted, setSubmitted] = useState(null);

  const [errors, setErrors] = useState({
    promotionType: "",
    discountAmount: "",
    discountPercentage: "",
    applicableItems: "",
    qualifyingPurchaseAmount: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    promotionType: -1,
    storeName: "",
    discountAmount: 0,
    discountPercentage: 0,
    applicableItems: [""],
    qualifyingPurchaseAmount: 0,
    startDate: "",
    endDate: "",
    description: "",
  });

  const resetErrors = () => {
    setErrors({
      promotionType: "",
      discountAmount: "",
      discountPercentage: "",
      applicableItems: "",
      qualifyingPurchaseAmount: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const resetFields = () => {
    setFormData({
      promotionType: -1,
      storeName: "",
      discountAmount: 0,
      discountPercentage: 0,
      applicableItems: [""],
      qualifyingPurchaseAmount: 0,
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
    handleEmpty(e, 1);
  };

  const handleItemChange = (index, value, type) => {
    if (type == 1) {
      const items = [...formData.applicableItems];
      items[index] = value;
      setFormData({
        ...formData,
        applicableItems: items,
      });
    }
  };
  ////////////////////////////////////////////////////////////////

  const handleEmpty = (e, word) => {
    const updateErrors = (prevErrors, key, value) => ({
      [key]:
        (typeof value === "string" && value.trim() === "") || value == 0
          ? "required"
          : "",
      discountPercentage:
        key === "discountPercentage"
          ? value > 100
            ? "Should be smaller than 100"
            : value == 0
            ? "required"
            : ""
          : prevErrors?.discountPercentage || "",
    });

    if (word == 1) {
      const { name, value } = e.target;
      setErrors((prevErrors = {}) => ({
        ...prevErrors,
        ...updateErrors(prevErrors, name, value),
      }));
    } else {
      Object.entries(e).forEach(([key, value]) => {
        setErrors((prevErrors = {}) => ({
          ...prevErrors,
          ...updateErrors(prevErrors, key, value),
        }));
      });
    }
    console.log(errors);
  };

  const addItem = (type) => {
    if (type == 1) {
      setFormData({
        ...formData,
        applicableItems: [...formData.applicableItems, ""],
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
    }
  };

  const setNextPage = () => {
    console.log("pressed next.", "step:", step, "method:", method);
    if (step == 1) {
      setFormData((prevItems) => ({
        ...prevItems,
        promotionType: method,
      }));
      if (method === 0) {
        handleEmpty(formData, 2);
        setErrorPage(1);
      } else {
        resetErrors();
        setStep(step + 1);
        setSubmitted(null);
      }
    } else {
      const filteredItems = formData.applicableItems.filter(
        (item) => item !== ""
      );
      if (
        ((formData.applicableItems.length != 0 &&
          filteredItems != 0 &&
          formData.discountPercentage != 0 &&
          formData.discountPercentage <= 100 &&
          formData.promotionType == 1) ||
          (formData.qualifyingPurchaseAmount != 0 &&
            formData.discountAmount != 0 &&
            formData.promotionType == 3)) &&
        formData.description &&
        formData.storeName
      ) {
        resetErrors();
        setStep(step + 1);
      } else {
        handleEmpty(formData, 2);
        setErrorPage(2);
        return;
      }
    }
  };

  const setPreviousPage = () => {
    setStep(step - 1);
    setErrorPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      if (!formData.startDate || !formData.endDate) {
        setErrorPage(3);
        handleEmpty(formData, 2);
        console.log("add date");
        return;
      }
      setErrorPage(4);
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
      setStep(4);
      resetFields();
      setMethod(0);
      if (response.status == 200) {
        console.log("forrrrm", formData, response);

        setSubmitted(1);
      } else if (response.status == 400) {
        setSubmitted(5);
      } else {
        setSubmitted(2);
      }
    } catch (error) {
      setStep(4);
      resetFields();
      setMethod(0);
      setSubmitted(2);
    }
  };

  return (
    <div className="">
      <MainMenu></MainMenu>
      <div className="sm:px-20 px-10">
        <div className=" pt-10">
          <div className="text-3xl font-semibold ">topic 1</div>
          <div className="text-xl pt-5 font-medium ">topic 2!</div>
        </div>
        <div className="flex justify-center mb-10 sm:mb-20">
          <div className="mt-10 w-[120vh] rounded-xl  sm:px-10 py-20 pb-10 h-auto border-solid border-black border-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
              <div className="w-full px-5 sm:px-10 md:px-20 h-[4rem] lg:h-[8rem] py-">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                  <div
                    className={`absolute left-0 top-2/4 h-0.5 ${
                      step == 1 ? "w-0" : step == 2 ? "w-1/2" : "w-full"
                    }  -translate-y-2/4 bg-green-500 transition-all duration-500`}
                  ></div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      step == 1
                        ? "text-white  bg-gray-900"
                        : "text-white bg-green-500"
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
                          step == 1 ? "text-black" : "text-green-500"
                        }`}
                      >
                        Step 1
                      </h6>
                      <p
                        id="steptext"
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 1 ? "text-black" : "text-green-500"
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
                        : step == 3 || step == 4
                        ? "text-white bg-green-500"
                        : "text-white  bg-gray-300"
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
                          step == 2
                            ? "text-gray-900 "
                            : step == 3 || step == 4
                            ? "text-green-500"
                            : "text-gray-300 "
                        }`}
                      >
                        Step 2
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 2
                            ? "text-gray-900 "
                            : step == 3 || step == 4
                            ? "text-green-500"
                            : "text-gray-300 "
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
                        : step == 4
                        ? "text-white  bg-green-500"
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
                          step == 3
                            ? "text-black"
                            : step == 4
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      >
                        Step 3
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          step == 3
                            ? "text-black"
                            : step == 4
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      >
                        Confirm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {step == 1 && (
                <div
                  id="firstpart"
                  className="transition-all duration-500 px-3 mb-6 sm:px-10"
                >
                  <div className="mt-5 mb-10 flex pt-5 items-center flex-col gap-2">
                    <label>Select a Promotion type</label>
                    <div className="h-6">
                      {errors.promotionType && (
                        <span className="text-sm text-red-600 font-semibold">
                          {errors.promotionType}
                        </span>
                      )}
                    </div>
                    <select
                      name="promotionType"
                      className="mt-4 px-4 py-3 rounded-lg"
                      value={method}
                      onChange={(e) => {
                        resetFields();
                        setMethod(Number(e.target.value));
                        handleChange(e);
                        console.log("method:", e.target.value);
                      }}
                    >
                      <option className="px-4 py-3" value={0}>
                        Select type
                      </option>
                      <option value={1} className="p-10">
                        Discount Percentage
                      </option>

                      <option value={3}>Discount on Amount</option>
                    </select>
                  </div>

                  <div
                    className={`w-full gap-5 sm:gap-10 flex items-center justify-center ${
                      submitted ? " sm:justify-between" : "sm:justify-end"
                    } text-end `}
                  >
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
              {step == 2 && (
                <div className="  transition-all duration-500">
                  <div>
                    {method === 1 ? (
                      <span>Discount By Percentage</span>
                    ) : method === 3 ? (
                      <span>Discount on Amount</span>
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
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      id="inputField"
                    />
                  </div>

                  <div>
                    <div>
                      <label>
                        {method == 1
                          ? "Discount Percentage"
                          : "Qualifying Purchase Amount"}
                      </label>
                      <input
                        type="number"
                        name={
                          method === 1
                            ? "discountPercentage"
                            : "qualifyingPurchaseAmount"
                        }
                        className="border-solid border-2"
                        value={
                          method === 1
                            ? formData.discountPercentage != 0
                              ? formData.discountPercentage
                              : ""
                            : formData.qualifyingPurchaseAmount != 0
                            ? formData.qualifyingPurchaseAmount
                            : ""
                        }
                        onChange={(e) => {
                          handleChange(e, 1);
                        }}
                        max={method === 1 ? 100 : undefined} // max is only relevant for discountPercentage
                      />
                      <span className="text-sm text-red-600 font-semibold">
                        {method == 1
                          ? errors.discountPercentage
                          : errors.qualifyingPurchaseAmount}
                      </span>
                    </div>
                    {method == 1 ? (
                      <div>
                        <label>Applicable Items:</label>
                        {formData.applicableItems.map((item, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              className={`border-solid border-2`}
                              value={item}
                              onChange={(e) => {
                                handleItemChange(index, e.target.value, 1);
                                handleEmpty(e, 1);
                              }}
                              name="applicableItems"
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
                    ) : (
                      <div>
                        <label>Discount Amount</label>
                        <input
                          type="number"
                          name="discountAmount"
                          className={`border-solid border-2`}
                          value={
                            formData.discountAmount != 0
                              ? `${formData.discountAmount}`
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e, 1);
                          }}
                        />
                        {errors.discountAmount && (
                          <span className="text-sm text-red-600 font-semibold">
                            {errors.discountAmount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      type="text"
                      name="description"
                      className={`border-solid border-2`}
                      value={formData.description}
                      onChange={(e) => {
                        handleChange(e, 1);
                      }}
                    />
                    {errors.description && (
                      <span className="text-sm text-red-600 font-semibold">
                        {errors.description}
                      </span>
                    )}
                  </div>
                  <div className="h-5">
                    {errorPage == 2 ? (
                      <p className="font-semibold text-red-500 pt-5 text-end">
                        Please Fill the Required Fields
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

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
                <div className="transition-all duration-500">
                  <div>
                    {method === 1 ? (
                      <span>Discount By Percentage</span>
                    ) : method === 3 ? (
                      <span>Discount on Amount</span>
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
                      value={formData.startDate}
                      onChange={(e) => {
                        handleChange(e, 1);
                      }}
                    />
                    {errors.startDate && (
                      <span className="text-sm text-red-600 font-semibold">
                        {errors.startDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      className={`border-solid border-2`}
                      value={formData.endDate}
                      onChange={(e) => {
                        handleChange(e, 1);
                      }}
                    />
                    {errors.endDate && (
                      <span className="text-sm text-red-600 font-semibold">
                        {errors.endDate}
                      </span>
                    )}
                  </div>
                  <div className="h-5">
                    {errorPage == 3 ? (
                      <p className="font-semibold text-red-500 pt-5  text-end">
                        Please Fill the Required Fields
                      </p>
                    ) : (
                      ""
                    )}
                    {errorPage == 4 ? (
                      <p className="font-semibold text-blue-500 pt-5  text-end">
                        Please Wait
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
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
              {step == 4 ? (
                submitted ? (
                  <div
                    id="alert-border-3"
                    class={`z-50  flex  items-center p-4 ${
                      submitted === 1
                        ? "text-green-800 border-t-4 border-green-300 bg-green-100 dark:text-green-600 dark:bg-gray-800 dark:border-green-800"
                        : "text-red-800 border-t-4 border-red-300 bg-red-100 dark:text-red-600 dark:bg-gray-800 dark:border-red-800"
                    } `}
                    role="alert"
                  >
                    <svg
                      class="flex-shrink-0 w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${submitted === 1 ? "green" : "red"} `}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div class="text-left  pr-3 ms-3 text-sm font-medium">
                      {submitted === 1 ? (
                        <span className="text-lg text-green-600 py-5 ">
                          <span className={`hidden md:inline-block`}>
                            Promotion Creation{" "}
                          </span>{" "}
                          Successfull!
                        </span>
                      ) : submitted === 2 ? (
                        <span className="text-lg text-red-600 py-5 ">
                          <span className={`hidden md:inline-block`}>
                            Promotion Creation{" "}
                          </span>{" "}
                          Failed!{" "}
                          <span className={`hidden md:inline-block`}>
                            Server Error{" "}
                          </span>
                        </span>
                      ) : submitted === 5 ? (
                        <span className="text-lg text-red-600 py-5 ">
                          <span className={`hidden md:block`}>
                            Promotion Creation
                          </span>{" "}
                          Failed!{" "}
                          <span className={`hidden md:block`}>
                            Please Enter Required Fields
                          </span>{" "}
                        </span>
                      ) : (
                        ""
                      )}{" "}
                      <a
                        href="#"
                        class="font-semibold underline hover:no-underline"
                      >
                        {" "}
                        Dashboard
                      </a>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div
                className={`w-full gap-5 sm:gap-10 flex items-center justify-center ${
                  submitted ? " sm:justify-between" : "sm:justify-end"
                } text-end `}
              >
                <button
                  onClick={() => setNextPage()}
                  type="button"
                  className=" px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CreatePromotion;
