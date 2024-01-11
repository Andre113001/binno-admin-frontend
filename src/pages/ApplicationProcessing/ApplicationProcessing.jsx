import { Fragment, useState } from "react";
import Back from "../../components/Back/Back";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Dropdown from "../../components/Dropdowmn/Dropdown";
import Topbar from "../../components/Topbar/Topbar";
import ApplicationProcessingList from "./ApplicationProcessingList";

import styles from "./ApplicationProcessing.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CustomModal from "../../components/CustomModal/CustomModal";
import ApplicationProcessingModal from "./ApplicationProcessingModal";
import ApplicationProcessingModalContent from "./ApplicationProcessingModalContent";
import ApplicationProcessingModalSchedule from "./ApplicationProcessingModalSchedule";

const ApplicationProcessing = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(0);

    const documentHandler = (type) => {
        setOpenModal(true);
        setModalType(type);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Fragment>
            <Topbar />
            <div className="container">
                <div>
                    <Back link="/dashboard" />
                </div>

                <div className={`${styles["title"]}`}>
                    <h6 className={`${styles["application-processing-title"]}`}>
                        Request
                    </h6>
                </div>

                <div className={`${styles["filters"]}`}>
                    <div className={`${styles["section_1"]}`}>
                        <Dropdown />
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
                                    // width: '397px',
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

                <div className={`${styles["application-processing-table"]}`}>
                    <table width={"100%"}>
                        <thead>
                            <tr className={`${styles["table-heading"]}`}>
                                <th>Application</th>
                                <th>Name of Institution</th>
                                <th>Address</th>
                                <th>Email Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${styles["table-body"]}`}>
                            <tr className={`${styles["table-row"]}`}>
                                <ApplicationProcessingList
                                    onOpenModal={documentHandler}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && (
                modalType === 1 ? <ApplicationProcessingModal
                open={openModal}
                handleClose={handleClose}
            >
                <ApplicationProcessingModalContent type={modalType} />
            </ApplicationProcessingModal> : <ApplicationProcessingModalSchedule
                    open={openModal}
                    handleClose={handleClose}
                >
                    <ApplicationProcessingModalContent type={modalType} />
                </ApplicationProcessingModalSchedule>
            )}
        </Fragment>
    );
};

export default ApplicationProcessing;
