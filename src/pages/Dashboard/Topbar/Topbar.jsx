import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ICONS
import {
    CalendarMonth as CalendarIcon,
    Notifications as NotificationIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

import styles from './Topbar.module.css'
import NavButtons from "./NavButtons";

function Topbar() {
    const navigate = useNavigate();

    function handleDestroyToken() {
        localStorage.removeItem("access");
        console.log("Token Destroyed");
        navigate("/");
    }

    return (
        <div>
            <nav className={`${styles['nav']}`}>
                <div className="flex flex-col items-center">
                    <Link
                        to={"/dashboard"}
                        className="flex flex-col items-center"
                    >
                        <img
                            className="w-[250px] mb-[-15px]"
                            src="../../../../public/img/binno-logo.png"
                            alt="Logo"
                        />
                        <span>System Administrator</span>
                    </Link>
                </div>

                <div>
                    <NavButtons/>
                </div>

                <div className="nav-items flex items-center">
                    {/* <span className="nav-item hover:text-yellow-400">
                        <NotificationIcon className="nav-icon" />
                    </span>
                    <Link to={"/calendar"}>
                        <span className="nav-item">
                            <CalendarIcon className="nav-icon" />
                        </span>
                    </Link> */}
                    <span
                        onClick={handleDestroyToken}
                        className="m-3 rounded-[10px] p-4 hover:bg-gray-300 hover:cursor-pointer duration-300 flex items-center gap-x-2"
                    >
                        <LogoutIcon className="nav-icon" />
                        Logout
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default Topbar;

// flex mt-5 bg-white border-gray-200 justify-center items-center md:gap-x-[35%] sm:gap-x-4
