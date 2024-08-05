import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div className="nav z-69">
      <ul className="flex sm:flex-row flex-col lg:fixed  justify-start sm:justify-between  py-3 bg-white z-50  px-5 font-medium  shadow-lg w-full">
        <Link className="w-full sm:w-auto mb-5 sm:mb-0 " to="/">
          <img
            id="logo"
            src="/epic-events-high-resolution-logo-transparent.png"
            alt="Epic Events Logo"
            className="h-[3rem] hover:pointer"
          />
        </Link>

        <div className="flex flex-wrap sm: gap-6 items-center  md:justify-end">
          <Link to={"/"} className="w-full sm:w-auto mx-3 hover:pointer">
            Home
          </Link>
          <Link to={"/events"} className="w-full sm:w-auto mx-3 hover:pointer">
            Events
          </Link>
          <Link
            to={"/createevent"}
            className="w-full sm:w-auto mx-3 hover:pointer sm:hidden lg:block "
          >
            Create Event
          </Link>
          <Link
            to={"/"}
            className="w-full sm:w-auto mx-3 hover:pointer sm:hidden md:block "
          >
            Contact Us
          </Link>
          <Link to={"/"} className="w-full sm:w-auto mx-3 hover:pointer">
            <button className="hover:bg-gray-200 py-2 px-4 border-2 border-black rounded-lg">
              Sign In
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
}
