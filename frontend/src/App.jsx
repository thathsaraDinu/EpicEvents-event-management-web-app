import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "./Components/MainMenu";
import Footer from "./Components/Footer";

function App() {
  const events = [
    "Boom Event",
    "tomorrow event",
    "yesterday event",
    "another event",
    "",
  ];

  

  return (
    <div className="overflow-x-hidden flex flex-col">
      <MainMenu></MainMenu>

      <div
        className="bg-cover bg-center h-[60vh] w-full sm:h-screen "
        style={{
          backgroundImage: "url('/SYUnrOsALSo527oY8elFm-transformed.jpg')",
        }}
      >
        <div className="text-white lg:w-auto mx-4 flex justify-center lg:justify-end mt-[8rem] sm:mt-[12rem] lg:mt-[14rem] ">
          <div className=" lg:w-[50rem] lg:text-left text-center">
            <div className="text-3xl sm:text-6xl font-bold">
              Plan Your Perfect Events
            </div>
            <br></br>
            <div className="hidden sm:inline sm:text-2xl ">
              From intimate gatherings to grand celebrations, we handle every
              detail with precision and care
            </div>
            <div></div>
            <div className="cursor-pointer inline-block sm:mt-8 px-4 py-3 rounded-md bg-blue-700 hover:bg-blue-800 text-white">
              Get Started!
            </div>
            <div className="hover:bg-blue-200 cursor-pointer sm:inline hidden ml-10 inline-block mt-8 px-4 py-3 rounded-md bg-white text-black">
              Lean More
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 flex flex-wrap justify-center gap-10 p-5">
        <div>
          <img className="w-[30rem] " src="/banner-3.png"></img>
        </div>
        <div className="flex flex-col justify-left px-4 w-[30rem] justify-center">
          <div className=" font-bold py-3">Lorem ipsum dolor sit amet.</div>

          <div className="text-3xl font-bold py-4">
            Lorem ipsum dolor sit amet.
          </div>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed amet
            aliquid odio laboriosam labore consequuntur?
          </div>
          <div className="mt-6">
            <div className="cursor-pointer py-2 px-3 rounded-md  inline bg-blue-700 hover:bg-blue-800  text-white ">
              Button
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 flex flex-wrap justify-center gap-10 p-5">
        <div className="flex flex-col justify-left px-4 w-[30rem] justify-center">
          <div className=" font-bold py-3">Lorem ipsum dolor sit amet.</div>

          <div className="text-3xl font-bold py-4">
            Lorem ipsum dolor sit amet.
          </div>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed amet
            aliquid odio laboriosam labore consequuntur?
          </div>
          <div className="mt-6">
            <div className="cursor-pointer py-2 px-3 rounded-md  inline bg-blue-700 text-white hover:bg-blue-800">
              Button
            </div>
            <div className="cursor-pointer py-2 ml-5 px-3 rounded-md  inline bg-white-800 text-black border-2 hover:border-black">
              Button
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-[30rem] "
            src="/event-management-service-5631302-4693331.webp"
          ></img>
        </div>
      </div>

      <div className="features bg-gray-200 p-10 pb-20 ">
        <div className="w-full">
          <div className="text-3xl pb-10  w-full font-bold text-center">
            Features
          </div>
          <div className="p-4 gap-10 w-full flex justify-center flex-wrap">
            <div className="rounded-md  relative w-[20rem] bg-white text-center shadow-lg flex flex-col ">
              <img
                src="/day96-camping.png"
                className="rounded-t-md w-full"
              ></img>
              <div className="px-5 pt-3 text-xl font-bold pb-3">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="px-5 pb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                odio repudiandae incidunt iure sit maxime.
              </div>
              <div className=" px-5 flex justify-center mb-5">
                <button className="cursor-pointer block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  More Details
                </button>
              </div>
            </div>
            <div className="rounded-md relative w-[20rem] bg-white text-center shadow-lg flex flex-col ">
              <img
                src="/day13-it-girl.png"
                className="rounded-t-md w-full"
              ></img>
              <div className="px-5 text-xl font-bold py-3">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="px-5 pb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                odio repudiandae incidunt iure sit maxime.
              </div>
              <div className="flex px-5  justify-center mb-5">
                <button className="cursor-pointer block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  More Details
                </button>
              </div>
            </div>
            <div className="rounded-md relative w-[20rem] bg-white text-center shadow-lg flex flex-col ">
              <img
                src="/day34-ticket.png"
                className="rounded-t-md w-full"
              ></img>
              <div className="px-5 text-xl font-bold py-3">
                Lorem ipsum dolor sit amet.
              </div>
              <div className="px-5 pb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                odio repudiandae incidunt iure sit maxime.
              </div>
              <div className="flex px-5 justify-center mb-5">
                <button
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  type="button"
                  className="cursor-pointer block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  More Details
                </button>
                <div
                  id="default-modal"
                  tabindex="-1"
                  aria-hidden="true"
                  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-900 bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
                >
                  <div class="relative p-4 w-full max-w-2xl max-h-full ">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Lorem ipsum dolor sit amet.
                        </h3>
                        <button
                          type="button"
                          class="text-gray-400 z-60 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="default-modal"
                        >
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span class="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Vitae dignissimos et esse ratione, reprehenderit
                          id eius molestias minima quo consequatur dolorem ex
                          beatae, cupiditate eligendi aut, voluptatum soluta rem
                          nostrum? Iure quidem blanditiis porro est, provident
                          dolorem officiis amet vitae.
                        </p>
                      </div>
                      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          I accept
                        </button>
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white  flex justify-between min-h-[50vh] ">
        <div className="text-left px-20 w-full flex flex-col justify-center py-2 gap-5">
          <div className="font-sans font-bold text-5xl">Mission</div>
          <div className="text-2xl ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            obcaecati tempore voluptatem velit exercitationem sit aliquam rem
            tenetur nisi ea.
          </div>
          <div className="text-xl text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            obcaecati tempore voluptatem velit exercitationem sit aliquam rem
            tenetur nisi ea.
          </div>
        </div>
        <div className="py-20 px-10 bg-gray-400 hidden xl:block">
          <img
            src="/pexels-fauxels-3183197.jpg"
            className="cover min-w-[50vh] max-w-[80vh] "
          ></img>
        </div>
      </div>
      <div className="p-5 md:p-10 bg-gray-100 py-20 flex flex-col items-center">
        <div className="  text-3xl pb-5 font-bold">Our Clients</div>
        <div className="flex gap-5 md:gap-20 items-center justify-center ">
          <div>
            <img src="/youtube-new-155631998.webp" className="w-[20vh]"></img>
          </div>
          <div>
            <img src="/current-logo-600x338.png" className="w-[20vh]"></img>
          </div>
          <div>
            <img
              src="/microsoft_azure_logo_icon_168977.webp"
              className="w-[20vh]"
            ></img>
          </div>
          <div>
            <img src="/51rttY7a+9L.png" className="w-[20vh]"></img>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap sm:p-20">
        <div>
          <img
            src="/RLplF55e_400x400.jpg"

            className="rounded-xl w-[20rem] h-[20rem] object-cover"
          ></img>
        </div>
        <div className="flex flex-col  p-10 md:pl-20  items-center justify-center ">
          <div className="text-2xl font-bold max-w-[30rem] pb-5">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            blanditiis cumque eos aut, facere temporibus nam suscipit dolores
            laudantium nostrum."
          </div>
          <div className="text-xl">Lorem, ipsum.</div>
          <div className="text-gray-500">Lorem, ipsum dolor.</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
