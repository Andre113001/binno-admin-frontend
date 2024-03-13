import { Fragment } from "react";
import {
  Dashboard,
  CalendarMonth,
  AccessTime,
  Person,
  HelpRounded,
  LogoutRounded,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  function handleDestroyToken() {
    localStorage.removeItem("access");
    console.log("Token Destroyed");
    navigate("/");
  }

  const sidebarLinks = [
    { to: "/dashboard", icon: <Dashboard />, label: "Dashboard" },
    { to: "/calendar", icon: <CalendarMonth />, label: "Calendar" },
    { to: "/activities", icon: <AccessTime />, label: "Activities" },
    { to: "/membership", icon: <Person />, label: "Members" },
    { to: "/inquiries", icon: <HelpRounded />, label: "Inquiries" },
  ];

  return (
    <Fragment>
      <div className="fixed top-0 left-0 h-full bg-[#e8e8e8] w-[17%] shadow">
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
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`cursor-pointer text-gray-700 bg-gradient-to-tr ${
                  activeLink === link.to
                    ? "from-gray-200 from-40% to-secondary to-100%  text-secondary "
                    : "bg-gray-200 border-none"
                } p-2 pr-[2rem] border border-blue-500 rounded-xl space-x-5 transition duration-100 ease-in-out 
                flex justify-center items-center`}
                onClick={() => handleLinkClick(link.to)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="cursor-pointer text-gray-700 hover:text-primary space-x-5 transition duration-100 ease-in-out p-3 flex justify-center items-center">
              <LogoutRounded />
              <span onClick={handleDestroyToken}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
