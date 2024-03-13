import { Fragment } from "react";
import {
  Dashboard,
  CalendarMonth,
  AccessTime,
  Person,
  HelpRounded,
  LogoutRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="fixed top-0 left-0 h-full bg-[#e8e8e8] w-[20rem] shadow">
        <div className="flex flex-col items-center justify-center mt-8">
          <img
            src="../../public/img/binno-logo.png"
            alt="binno-logo"
            className="h-[6rem] mt-10"
          />
          <h1 className="text-xl">
            <span>Sytem Administrator</span>
          </h1>
        </div>
        <div className="mt-10 justify-center items-center">
          <div className="flex flex-col justify-start items-start space-y-5 text-xl ml-[20%]">
            <Link to="/dashboard">
              <div className="cursor-pointer text-secondary  bg-gradient-to-tr from-white to-secondary p-2 pr-[4rem] border border-blue-500 rounded-xl space-x-5 transition duration-100 ease-in-out flex justify-center items-center">
                <Dashboard />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to="/calendar">
              <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
                <CalendarMonth />
                <span>Calendar</span>
              </div>
            </Link>
            <Link to="/activities">
              <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
                <AccessTime />
                <span>Activities</span>
              </div>
            </Link>
            <Link to="/membership">
              <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
                <Person />
                <span>Members</span>
              </div>
            </Link>
            <Link to="/inquiries">
              <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
                <HelpRounded />
                <span>Inquiries</span>
              </div>
            </Link>
            <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
              <LogoutRounded />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
