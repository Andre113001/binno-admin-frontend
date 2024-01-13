import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ICONS
import {
    CalendarMonth as CalendarIcon,
    Notifications as NotificationIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

import styles from "../../Dashboard/Topbar/Topbar.module.css";
import NavButtons from "../../Dashboard/Topbar/NavButtons";
import { Button } from "@mui/material";

function Topbar() {
    const navigate = useNavigate();

    // function handleDestroyToken() {
    //     localStorage.removeItem("access");
    //     console.log("Token Destroyed");
    //     navigate("/");
    // }

    return (
        <div>
            <nav className={`${styles["nav"]}`}>
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

                <div className="nav-items flex items-center">
                    <Button
                        startIcon={<ArrowBackIcon sx={{height: '26px', width: '26px', color: '#fff'}} />}
                        // onClick={handleDestroyToken}
                        sx={{ height: "34px", background: '#FF7A00', border: '1px solid #FF7A00', padding: '4px 24px', color: '#fff', borderRadius: '18px', '&:hover': {background: '#FF7A00'}, textTransform: "capitalize" }}
                    >
                        Back
                    </Button>
                </div>
            </nav>
        </div>
    );
}

export default Topbar;
