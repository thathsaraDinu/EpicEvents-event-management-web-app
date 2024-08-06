import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import Footer from "../Footer";
import getApiUrl from "../getApiUrl";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [fEvents, setFEvents] = useState([]);

  const apiUrl = getApiUrl();
  const navigate = useNavigate(); // Move `useNavigate` hook here

  useEffect(() => {
    const fetchEvents = async () => {
      let array1 = [];
      try {
        const response = await fetch(apiUrl + "events");
        const data = await response.json();
        setEvents(data);

        data.forEach((element) => {
          if (element.isFeatured) {
            array1.push(element);
          }
        });
        setFEvents(array1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [apiUrl]);

  // Function to handle navigation
  const handleUpdate = (id) => {
    navigate(`/updateevent/${id}`);
  };

  return (
    <div>
      <MainMenu />
      <div className="md:px-10 sm:px-5 lg:px-20">
        <div className="w-full flex pt-10 lg:pt-[6rem] p-5 pr-10  justify-end">
          <input
            className="py-2 px-4 w-[20rem] border-2 border-black rounded-md"
            placeholder="Search Events"
          />
        </div>
        <div className="p-10 pt-5 flex flex-col">
          <div className="font-semibold text-2xl">Featured This Week</div>
          <div>
            <div className="mt-8 overflow-auto flex gap-8 justify-left">
              {fEvents && fEvents.length > 0 ? (
                fEvents.map((item) => (
                  <div
                    key={item._id}
                    className="w-[20rem] relative mb-3 h-[28rem] bg-white flex-shrink-0 border border-gray-200 rounded-lg shadow-md"
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg h-2/5 w-full object-cover"
                        src={
                          item.eventPhoto
                            ? "http://localhost:3001/images/" + item.eventPhoto
                            : "http://localhost:3001/images/no-image.png"
                        }
                        alt=""
                      />
                    </a>
                    <div className="p-5 flex flex-col">
                      <div className="mb-3">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                          {item.eventName || ""}
                        </h5>
                      </div>
                      <div className="w-full flex">
                        <div className="mb-3 w-1/2 font-normal text-gray-700">
                          {item.eventDate || ""}
                        </div>
                        <div className="mb-3 w-1/2 font-normal text-gray-700">
                          {item.eventTime || ""}
                        </div>
                      </div>
                      <div className="w-full flex mb-3">
                        {item.eventCity || ""}
                        {item.eventCountry ? ", " + item.eventCountry : ""}
                      </div>
                      <div className="absolute bottom-5 left-5">
                        <a
                          href="#"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Read more
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pl-4 font-medium text-gray-500">
                  No Featured Events This Week
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-10 pt-5 mb-20 flex flex-col">
          <div className="font-semibold text-2xl">Upcoming Events</div>
          <div>
            <div className="mt-8 overflow-auto flex gap-8 justify-left">
              {events.length > 0 ? (
                events.map((item) => (
                  <div
                    key={item._id}
                    className="w-[20rem] relative mb-3 h-[32rem] bg-white flex-shrink-0 border border-gray-200 rounded-lg shadow-md"
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg h-2/5 object-cover"
                        src={
                          item.eventPhoto
                            ? "http://localhost:3001/images/" + item.eventPhoto
                            : "http://localhost:3001/images/no-image.png"
                        }
                        alt=""
                      />
                    </a>
                    <div className="p-5 flex flex-col">
                      <div className="mb-3">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                          {item.eventName || ""}
                        </h5>
                      </div>
                      <div className="w-full flex">
                        <div className="mb-3 w-1/2 font-normal text-gray-700">
                          {item.eventDate || ""}
                        </div>
                        <div className="mb-3 w-1/2 font-normal text-gray-700">
                          {item.eventTime || ""}
                        </div>
                      </div>
                      <div className="w-full mb-3">
                        {item.eventAddress || ""}
                      </div>
                      <div className="w-full flex mb-3">
                        {item.eventCity || ""}
                        {item.eventCountry ? ", " + item.eventCountry : ""}
                      </div>
                      <div className="h-full flex items-end gap-10">
                        <div className="bottom-5 left-5">
                          <a
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            Read more
                            <svg
                              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </a>
                        </div>
                        <div
                          onClick={() => handleUpdate(item._id)}
                          className="inline-flex py-2 px-3 border-green-800 border rounded-md bg-green-200 text-sm font-medium cursor-pointer"
                        >
                          Update
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pl-4 font-medium text-gray-500">
                  No Upcoming Events
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllEvents;
