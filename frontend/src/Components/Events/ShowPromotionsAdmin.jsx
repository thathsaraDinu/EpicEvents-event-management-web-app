import React, { useState, useEffect } from "react";
import getApiUrl from "../getApiUrl";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "../MainMenu";
import Footer from "../Footer";

function ShowPromotionsAdmin() {
  const [discounts, setDiscounts] = useState([]);
    const [amounts, setAmounts] = useState([]);

  const apiUrl = getApiUrl();
  const [promotiontype, setPromotionType] = useState(1);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(apiUrl + "discountpromotions");
        const data = await response.json();
        setDiscounts(data);
      } catch (error) {
        console.error("Error fetching discount percentage:", error);
      }
    };

    fetchDiscounts();
    const fetchAmounts = async () => {
      try {
        const response = await fetch(apiUrl + "discountamounts");
        const data = await response.json();
        setAmounts(data);
      } catch (error) {
        console.error("Error fetching discount amounts:", error);
      }
    };

    fetchAmounts();
  }, [apiUrl]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navigate = useNavigate();

  return (
    <div>
      <MainMenu></MainMenu>
      <div>
        <div className="flex justify-end items-center pr-5 sm:pr-20 pt-2 gap-5 flex-wrap">
          <input
            placeholder="Search"
            className="px-3 py-2 rounded-lg border-gray-400 border-2"
          ></input>
          <Link
            className="py-2 px-3 bg-blue-400 border-2 border-blue-600 rounded-lg"
            to={"/promotion"}
          >
            Add Promotion
          </Link>
        </div>
        <div className=" px-5 py-2 flex justify-evenly  font-xl">
          <div
            onClick={() => setPromotionType(1)}
            className="cursor-pointer p-5"
          >
            Discount on Percentage
          </div>
          <div
            onClick={() => setPromotionType(3)}
            className="cursor-pointer p-5"
          >
            Discount on Amount
          </div>
        </div>
        <div>
          {promotiontype === 1 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Item ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Discount Percentage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.length > 0
                    ? discounts.flatMap((item) =>
                        item.applicableItems.map((applicableItem) => (
                          <tr
                            key={`${item._id}-${applicableItem}`}
                            className="border-b border-gray-200 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                            >
                              {applicableItem}
                            </th>
                            <td className="px-6 py-4">
                              {item.discountPercentage}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                              {item.price}
                            </td>
                            <td className="px-6 py-4">{item.description}</td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                              {formatDate(item.startDate)}
                            </td>
                            <td className="px-6 py-4">
                              {formatDate(item.endDate)}
                            </td>
                            <td className="px-6 py-4">
                              {
                                <div className="flex flex-wrap gap-5">
                                  <Link
                                    to={"/update"}
                                    className="py-2 px-3 bg-blue-500 rounded-lg text-black"
                                  >
                                    Update
                                  </Link>

                                  <Link className="py-2 px-3 bg-red-500 rounded-lg text-black">
                                    Delete
                                  </Link>
                                </div>
                              }
                            </td>
                          </tr>
                        ))
                      )
                    : ""}
                </tbody>
              </table>
            </div>
          ) : promotiontype === 3 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Qualifying Purchase Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      discount Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      IsActive
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {amounts.length > 0
                    ? amounts.map((item) => (
                        <tr
                          key={`${item._id}`}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">
                            {item.qualifyingPurchaseAmount}
                          </td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {item.discountAmount}
                          </td>
                          <td className="px-6 py-4">{item.description}</td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {formatDate(item.startDate)}
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(item.endDate)}
                          </td>
                          <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {item.isActive}
                          </td>
                          <td className="px-6 py-4">
                            {
                              <div className="flex flex-wrap gap-5">
                                <Link
                                  to={"/update"}
                                  className="py-2 px-3 bg-blue-500 rounded-lg text-black"
                                >
                                  Update
                                </Link>

                                <Link className="py-2 px-3 bg-red-500 rounded-lg text-black">
                                  Delete
                                </Link>
                              </div>
                            }
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ShowPromotionsAdmin;
