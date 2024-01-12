import { Fragment } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";

import Back from "../../components/Back/Back";
import Topbar from "../../components/Topbar/Topbar";
import processingStyle from "../ApplicationProcessing/ApplicationProcessing.module.css";
import Dropdown from "../../components/Dropdowmn/Dropdown";

import styles from "./MembershipManagement.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ActivitiesList from "./ActivityList";

const ViewActivities = () => {
    return (
        <Fragment>
            <Topbar />

            <div className="container">
                <div>
                    <Back link="/admin/membership_management" />
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
                                placeholder="Search Auther"
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
                                        padding: "6px 0 6px 0", // Adjust the padding if needed
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
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
                                <th>Application ID</th>
                                <th>Auther</th>
                                <th>Name of Activity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className={`${processingStyle["table-body"]}`}>
                            <tr className={`${processingStyle["table-row"]}`}>
                                <ActivitiesList
                                // onOpenModal={documentHandler}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewActivities;
