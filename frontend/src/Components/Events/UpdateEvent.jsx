import { useEffect, useRef, useState } from "react";
import MainMenu from "../MainMenu";
import Footer from "../Footer";
import getApiUrl from "../getApiUrl";
import { useParams } from "react-router-dom";

function UpdateEvents() {
  const [name, setName] = useState("");
  const [eventDate, setDate] = useState("");
  const [eventTime, setTime] = useState("");
  const [eventDesc, setDesc] = useState("");
  const [eventCountry, setCountry] = useState("");
  const [eventCity, setCity] = useState("");
  const [eventAddress, setAddress] = useState("");
  const [eventPhoto, setPhoto] = useState();
  const fullURL = window.location.href;
  const [image, setImage] = useState();
  const [noField, setNoField] = useState("");
  const apiUrl = getApiUrl();

  const {id} = useParams();
  const formRef = useRef(null);

  // Step 2: Create a URL object
 

  useEffect(() => {
    const current = async () => {
      fetch(apiUrl + "getEventById/" + id, {})
        .then((res) => {
          setName(res.body.eventName);
          setDate(res.body.eventDate);
          setTime(res.body.eventTime);

          setDesc(res.body.eventDesc);
          setCountry(res.body.eventCountry);

          setCity(res.body.eventCity);
          setAddress(res.body.eventAddress);
          setPhoto(res.body.eventPhoto);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    current();
  }, []);

  function ClearFields() {
    const conf = confirm("Are you sure to clear the fields?");
    if (conf && formRef.current) {
      const formElements = formRef.current.elements;

      for (let element of formElements) {
        if (element.tagName === "INPUT" || element.tagName === "  TEXTAREA") {
          element.value = "";
        }
        // Handle other form elements if needed, e.g., SELECT
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  console.log("fesfe" + id);

    const formData = new FormData(e.target);

    await fetch(apiUrl + "updateEvent/" + id, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        alert("success");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  return (
    <div>
      <MainMenu></MainMenu>
      <div className="w-full flex justify-center lg:justify-between overlap ">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          method="POST"
          class="lg:w-1/2  p-10  pb-5 md:px-20 xl:mx-10 bg-transparent lg:mt-[6rem] mt-10"
        >
          <div className="w-full text-center pb-10 text-2xl font-semibold">
            Update event
          </div>

          <div class="w-full px-3 mb-6 ">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-event-name"
            >
              Event Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-event-name"
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-date"
              >
                Date
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-date"
                type="date"
                name="date"
                placeholder=""
                value={eventDate}
              />
            </div>
            <div class="w-full md:w-1/2 px-3 ">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-time"
              >
                Time
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-time"
                type="time"
                name="time"
                value={eventTime}
                placeholder=""
              />
            </div>
          </div>

          <div class="flex flex-wrap mb-6">
            <div class="w-full sm:w-1/2 px-3 mb-6 sm:mb-0 ">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-country"
              >
                Country
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-country"
                type="text"
                name="country"
                placeholder=""
                value={eventCountry}
              />
            </div>
            <div class="w-full sm:w-1/2 px-3 mb-6 sm:mb-0 ">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                name="city"
                placeholder=""
                value={eventCity}
              />
            </div>
          </div>
          <div class="w-full px-3 mb-6 ">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-address"
            >
              Address
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              name="address"
              placeholder=""
              value={eventAddress}
            />
          </div>
          <div class="flex  mb-6">
            <div class="w-3/4 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-desc"
              >
                Description
              </label>
              <textarea
                class="appearance-none block w-full h-[6rem] bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-desc"
                value={eventDesc}
                name="desc"
              />
            </div>
            <div className="w-1/4 px-3">
              <div className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Image{" "}
              </div>
              <div className=" flex items-center">
                <label className="cursor-pointer">
                  <img
                    className="h-[6rem] bg-gray-200 object-cover"
                    alt=""
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : eventPhoto
                        ? "http://localhost:3001/images/" + eventPhoto
                        : "http://localhost:3001/images/" + "no-image.png"
                    }
                  />
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="px-3 mb-5"></div>

          <div className="flex justify-center gap-10">
            <div
              onClick={ClearFields}
              className=" py-2 px-4 cursor-pointer border-2 rounded-md border-gray-400 border-solid mt-5 mb-5 "
            >
              Clear Fields
            </div>
            <button
              className=" py-2 px-4 bg-blue-300 border-2 rounded-md border-gray-400 border-solid mt-5 mb-5 "
              type="submit"
            >
              Submit
            </button>
          </div>

          <div role="alert" id="successBox" className="hidden">
            <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
              Success
            </div>
            <div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
              <p>Event is Successfully Created!</p>
            </div>
          </div>
          <div role="alert" id="failureBox" className="hidden">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Failure
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>
                {noField === "true"
                  ? "Please Fill the Required Fields!"
                  : "Event Creation Failed!"}
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UpdateEvents;
