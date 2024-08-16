import { useState } from "react";
import getApiUrl from "../getApiUrl";
import { useMultistepForm } from "./useMultistepForm";
import MainMenu from "../MainMenu";
import Footer from "../Footer";
import { AddPromotionStep1 } from "./addpromotionstep1";
import { AddPromotionStep2 } from "./addpromotionstep2";
import { AddPromotionStep3 } from "./addpromotionstep3";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddPromotionMain() {
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
 

  const schema1 = z.object({
    promotionType: z
      .enum(["1", "3"], { message: "Please select a promotion type" })
      
  });

  const schema2 = z.object({
    storeName: z.string().min(1).max(255),
    discountAmount: z.number().int().min(0),
    discountPercentage: z.number().int().min(0).max(100),
    applicableItems: z.array(z.string().min(1).max(255)),
    qualifyingPurchaseAmount: z.number().int().min(0),
    description: z.string().min(1).max(255),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema1),
  });

  const onSubmit = async (data) => {
   next();
    console.log(data);
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "promotionType" ||
        name === "discountAmount" ||
        name === "discountPercentage" ||
        name === "qualifyingPurchaseAmount"
          ? value === 0 || isNaN(value)
            ? value
            : Number(value) // Check for valid numeric input
          : value,
    }));
    console.log(formData);
  };

  const addItem = (type) => {
    if (type == 1) {
      setFormData({
        ...formData,
        applicableItems: [...formData.applicableItems, ""],
      });
    }
    console.log(formData);
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

  const removeItem = (index, type) => {
    if (type == 1) {
      const items = formData.applicableItems.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        applicableItems: items,
      });
    }
  };
 const {
   steps,
   currentStepIndex,
   step,
   isFirstStep,
   isSecondStep,
   isComplete,
   next,
   back,
   isLastStep,
 } = useMultistepForm([
   <AddPromotionStep1
     {...formData}
     handleChange={handleChange}
     register={register}
     errors={errors}
   />,
   <AddPromotionStep2
     {...formData}
     handleChange={handleChange}
     addItem={addItem}
     removeItem={removeItem}
     handleItemChange={handleItemChange}
   />,
   <AddPromotionStep3 {...formData} handleChange={handleChange} />,
 ]);
  
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 "
            >
              <div className="w-full px-5 sm:px-10 md:px-20 h-[4rem] lg:h-[8rem] py-">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                  <div
                    className={`absolute left-0 top-2/4 h-0.5 ${
                      isFirstStep ? "w-0" : isSecondStep ? "w-1/2" : "w-full"
                    }  -translate-y-2/4 bg-green-500 transition-all duration-500`}
                  ></div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      isFirstStep
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
                          isFirstStep ? "text-black" : "text-green-500"
                        }`}
                      >
                        Step 1
                      </h6>
                      <p
                        id="steptext"
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isFirstStep ? "text-black" : "text-green-500"
                        }`}
                      >
                        Select Type
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      isSecondStep
                        ? "text-white  bg-gray-900"
                        : isLastStep || isComplete
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
                          isSecondStep
                            ? "text-gray-900 "
                            : isLastStep || isComplete
                            ? "text-green-500"
                            : "text-gray-300 "
                        }`}
                      >
                        Step 2
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isSecondStep
                            ? "text-gray-900 "
                            : isLastStep || isComplete
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
                      isLastStep
                        ? "text-white  bg-gray-900"
                        : isComplete
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
                          isLastStep
                            ? "text-black"
                            : isComplete
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      >
                        Step 3
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isLastStep
                            ? "text-black"
                            : isComplete
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
              {step}
              <div className="mt-5 mb-10 flex pt-5 items-center flex-col gap-2">
                <label>Select a Promotion type</label>
                <div className="h-6"></div>

                <input
                  type="text"
                  name="promotionType"
                  onChange={(e) => {
                    handleChange(e);
                    console.log(typeof promotionType);
                  }}
                  {...register("promotionType")}
                />
                {errors.promotionType && <p>{errors.promotionType.message}</p>}
              </div>
              {!isComplete && (
                <div
                  className={`w-full gap-5 sm:gap-10 flex items-center justify-center sm:justify-end text-end`}
                >
                  {!isFirstStep && (
                    <button
                      onClick={back}
                      type="button"
                      className=" px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                    >
                      Previous
                    </button>
                  )}

                  <button
                    type="submit"
                    className=" px-4 py-2 border-blue-500 border-solid border-2 bg-blue-700 text-white rounded-lg "
                  >
                    {isLastStep ? "Submit" : "Next"}
                  </button>
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
