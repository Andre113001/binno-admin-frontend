import React, { Fragment, useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField, Pagination } from "@mui/material";

import Back from "../../components/Back/Back";
import Topbar from "../../components/Topbar/Topbar"
import processingStyle from "../ApplicationProcessing/ApplicationProcessing.module.css";
import Dropdown from "../../components/Dropdowmn/Dropdown";

import styles from "./MembershipManagement.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ActivitiesList from "./ActivityList";
import useHttp from "../../hooks/http-hook";

const ViewActivities = () => {
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Set the number of items per page
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const { sendRequest, isLoading } = useHttp();

    useEffect(() => {
        const loadActivities = async () => {
            const result = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/get/activities`,
            });
            setActivities(result);
        };

        loadActivities();
    }, [sendRequest]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter items based on search term
    const filteredItems = activities.filter((activity) =>
        Object.values(activity).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Get current items based on search and pagination
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };

    return (
        <Fragment>
            <Topbar />

            <div className="container">
                <div>
                    <Back link="/dashboard" />
                </div>

                <div className={`${styles["management-title"]}`}>
                    <div className={`${styles["title"]}`}>
                        <h1>Activities</h1>
                    </div>
                </div>

                <div className={`${processingStyle["filters"]}`}>
                    <div>
                        <div>
                            <TextField
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    height: "35px",
                                    width: "398px",
                                    "& input": {
                                        padding: "6px 0 6px 0",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                                onChange={handleSearchChange}
                                value={searchTerm}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={`${processingStyle["application-processing-table"]}`}
                >
                    <table width={"100%"}>
                        <thead>
                            <tr
                                className={`${processingStyle["table-heading"]}`}
                            >
                                <th>Activity ID</th>
                                <th>Member ID</th>
                                <th>Name of Activity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className={`${processingStyle["table-body"]}`}>
                            {currentItems.map((activity) => (
                                <tr
                                    className={`${processingStyle["table-row"]}`}
                                    key={activity.history_id}
                                >
                                    <ActivitiesList item={activity} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        count={Math.ceil(filteredItems.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            my: 5,
                            "& .MuiPaginationItem-root": {
                                color: '#424864', // Set your desired color for pagination item
                            },
                            "& .MuiPaginationItem-page.Mui-selected": {
                                backgroundColor: '#ff7a01', // Set your desired background color for selected page
                                color: '#fff', // Set your desired text color for selected page
                            },
                        }}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ViewActivities;
