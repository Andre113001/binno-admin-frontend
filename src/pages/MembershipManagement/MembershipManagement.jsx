import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";


import styles from './MembershipManagement.module.css';
import processingStyle from '../ApplicationProcessing/ApplicationProcessing.module.css';
import SearchIcon from "@mui/icons-material/Search";

// import Topbar from "../../components/Topbar/Topbar";
import Back from "../../components/Back/Back";
import Dropdown from "../../components/Dropdowmn/Dropdown";
import { TextField } from "@mui/material";
import MembershipManagementList from "./MembershipManagementList";
import Topbar from "../../components/Topbar/Topbar";
import useHttp from "../../hooks/http-hook";

const MembershipManagement = () => {
    const [ members, setMembers ] = useState();
    const { sendRequest, isLoading} = useHttp();

    useEffect(() => {
        const loadData = async () => {
            const result = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/get/users`,
            });
            setMembers(result);
        }

        loadData();
    }, [sendRequest])

    return (
        <Fragment>
            <Topbar />
            <div className="container">
                <div>
                    <Back link="/dashboard" />
                </div>

                <div className={`${styles['management-title']}`}>
                    <div className={`${styles['title']}`}>
                        <h1>Members</h1>
                    </div>

                    <Link className={`${styles['management-request']}`}>
                        <p>Request for application</p>
                        {/* <div className={`${styles['circle']}`} /> */}
                    </Link>
                </div>

                <div className={`${processingStyle["filters"]}`}>
                    <div className={`${processingStyle["section_1"]}`}>
                        <Dropdown />
                    </div>

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
                                    width: '398px',
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

                <div className={`${processingStyle["application-processing-table"]}`}>
                    <table width={"100%"}>
                        <thead>
                            <tr className={`${processingStyle["table-heading"]}`}>
                                <th>Member's ID</th>
                                <th>Name of Institution</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${processingStyle["table-body"]}`}>
                            {members?.map((member) => (
                                <tr className={`${processingStyle["table-row"]}`} key={member.member_id}>
                                <MembershipManagementList
                                    data={member}
                                />
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default MembershipManagement;
