import { Fragment } from "react";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";

import styles from './ActivityMonitoring.module.css';
import SearchIcon from "@mui/icons-material/Search";

import Topbar from "../../components/Topbar/Topbar";
import Back from "../../components/Back/Back";
import { TextField } from "@mui/material";
import ActivityMonitoringList from "./ActivityMonitoringList";

const ActivityMonitoring = () => {
    return (
        <Fragment>
            <Topbar />
            <div className="container">
                <div>
                    <Back link="/dashboard" />
                </div>

                <div className={`${styles['management-title']}`}>
                    <div className={`${styles['title']}`}>
                        <h1>Activities</h1>
                    </div>
                </div>

                <div className={`${styles["filters"]}`}>
                    <div>
                        <div>
                            <TextField
                                placeholder="Search Author"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    height: "35px",
                                    width: '398px',
                                    "& input": {
                                        padding: "6px 0 6px 0", 
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={`${styles["application-processing-table"]}`}>
                    <table width={"100%"}>
                        <thead>
                            <tr className={`${styles["table-heading"]}`}>
                                <th>Application ID</th>
                                <th>Author</th>
                                <th>Name of Activity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className={`${styles["table-body"]}`}>
                            <tr className={`${styles["table-row"]}`}>
                                <ActivityMonitoringList
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

export default ActivityMonitoring;
