import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import photo from "../../assets/Screenshot (549).png";

import styles from "../ApplicationProcessing/ApplicationProcessing.module.css";
import managementStyles from "./MembershipManagement.module.css";

import RespondIcon from "../ApplicationProcessing/RespondIcon";
import ActivitiesIcon from "./ActivitiesIcon";
import TimeOut from "./TimeOutIcon";
import MembershipManagementModal from "./MembershipManagementModal";
import { Button } from "@mui/material";

const MembershipManagementList = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const { onOpenModal } = props;
    const memberData = props.data;

    const modalHandler = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    console.log(memberData);

    return (
        <Fragment>
            <td>
                <p>{memberData.member_id}</p>
            </td>
            <td className={`${managementStyles["institution-col"]}`}>
                <img src={`http://217.196.51.115/m/api/images?filePath=profile-img/${memberData.setting_profilepic}`} alt="" />
                <div className={`${managementStyles["institution-data"]}`}>
                    <div style={{fontWeight: 'bold'}}>{memberData.setting_institution}</div>
                    <div>{memberData.setting_address}</div>
                </div>
            </td>
            <td className={`${managementStyles["action"]}`}>
                <div className={`${managementStyles["action-button"]}`}>
                    <div className={`${managementStyles["document"]}`}>
                        <div onClick={() => documentHandler(1)}>
                            <ActivitiesIcon />
                        </div>
                        <button
                            onClick={() => documentHandler(1)}
                            className={`${managementStyles["document-button"]}`}
                        >
                            View activities
                        </button>
                    </div>
                    <div className={`${managementStyles["schedule"]}`}>
                        {/* <ScheduleIcon /> */}
                        <div onClick={modalHandler}>
                            <TimeOut />
                        </div>
                        <button
                            onClick={modalHandler}
                            className={`${managementStyles["timeout-button"]}`}
                        >
                            Suspend
                        </button>
                    </div>

                    <div className={`${managementStyles["border"]}`}></div>

                    <div className={`${managementStyles["schedule"]}`}>
                        <Link
                            className={`${managementStyles["member-button"]}`}
                        >
                            View Member
                        </Link>
                    </div>
                </div>
            </td>

            <MembershipManagementModal
                open={openModal}
                handleClose={handleClose}
            >
                <div className={`${managementStyles["modal-main"]}`}>
                    <div className={`${managementStyles["question"]}`}>
                        <h1>Are you sure?</h1>
                        <p>
                            Do you really want to Suspend this user for 7 days?
                        </p>
                    </div>

                    <div className={`${managementStyles['modal-button']}`}>
                        <Button sx={{height: '50px', background: '#FF7A00', border: '1px solid #FF7A00', width: '140px', borderRadius: '10px', '&:hover': {
                            background: '#FF7A00'
                        }, color: '#fff', fontSize: '18px', fontWeight: '500'}}>
                            Yes
                        </Button>
                        <Button sx={{height: '50px', border: '1px solid #000', width: '140px', borderRadius: '10px', fontSize: '18px', fontWeight: '500', color: '#000'}}>
                            No
                        </Button>
                    </div>
                </div>
            </MembershipManagementModal>
        </Fragment>
    );
};

export default MembershipManagementList;
