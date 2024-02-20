import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import photo from "../../assets/Screenshot (549).png";

import styles from "../ApplicationProcessing/ApplicationProcessing.module.css";
import managementStyles from "./MembershipManagement.module.css";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import RespondIcon from "../ApplicationProcessing/RespondIcon";
import ActivitiesIcon from "./ActivitiesIcon";
import TimeOut from "./TimeOutIcon";
import MembershipManagementModal from "./MembershipManagementModal";
import { Button } from "@mui/material";
import { useTimer } from "react-timer-hook";

const MembershipManagementList = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [duration, setDuration] = useState("7days"); // Default duration is 7 days`
  const [seconds, setSeconds] = useState(30); // Initial timer value for permanent suspension
  const [startTimer, setStartTimer] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { onOpenModal } = props;
  const memberData = props.data;

  const modalHandler = (user) => {
    setOpenModal(true);
    setSelectedUser(user);
    // startTimer();
    setStartTimer(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setStartTimer(false);
    setSeconds(30);
  };

  const handleRadioChange = (event) => {
    setDuration(event.target.value);
  };

  useEffect(() => {
    let intervalId;

    if (startTimer) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            clearInterval(intervalId);
            setStartTimer(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [startTimer]);

  const handleConfirmRestrict = () => {
    console.log({
      user: selectedUser,
      duration: duration,
    });
  };

  // console.log(memberData);

  return (
    <Fragment>
      <td>
        <p>{memberData.member_id}</p>
      </td>
      <td>
        <div className={`${managementStyles["institution-status"]}`}>
          <div className={`${managementStyles["restricted-status"]}`}></div>
          <p>{memberData.status}</p>
          <p>Status</p>
        </div>
      </td>
      <td className={`${managementStyles["institution-col"]}`}>
        <img
          src={`http://217.196.51.115/m/api/images?filePath=profile-img/${memberData.setting_profilepic}`}
          alt=""
        />
        <div className={`${managementStyles["institution-data"]}`}>
          <div style={{ fontWeight: "bold" }}>
            {memberData.setting_institution}
          </div>
          <div>{memberData.setting_address}</div>
        </div>
      </td>
      <td className={`${managementStyles["action"]}`}>
        <div className={`${managementStyles["action-button"]}`}>
          <div
            className={`${managementStyles["schedule"]}`}
            onClick={() => modalHandler(memberData)}
          >
            {/* <ScheduleIcon /> */}
            <div>
              <TimeOut />
            </div>
            <button className={`${managementStyles["timeout-button"]}`}>
              Restrict
            </button>
          </div>

          <div className={`${managementStyles["border"]}`}></div>

          <div className={`${managementStyles["schedule"]}`}>
            <Link
              to={`/membership/${memberData.setting_memberId}`}
              className={`${managementStyles["member-button"]}`}
            >
              View Member
            </Link>
          </div>
        </div>
      </td>

      <MembershipManagementModal open={openModal} handleClose={handleClose}>
        <div className={`${managementStyles["modal-main"]}`}>
          <div className={`${managementStyles["question"]}`}>
            <h1>Are you sure?</h1>
            <p>
              Do you really want to suspend {selectedUser?.setting_institution}?
            </p>
          </div>

          <RadioGroup value={duration} onChange={handleRadioChange}>
            <FormControlLabel
              value="7days"
              control={<Radio />}
              label="7 days"
            />
            <FormControlLabel
              value="1month"
              control={<Radio />}
              label="1 month"
            />
            <FormControlLabel
              value="permanent"
              control={<Radio />}
              label={startTimer ? `Permanent (${seconds}s)` : "Permanent"}
              disabled={startTimer}
            />
          </RadioGroup>

          <div className={`${managementStyles["modal-button"]}`}>
            <Button
              sx={{
                height: "50px",
                background: "#FF7A00",
                border: "1px solid #FF7A00",
                width: "140px",
                borderRadius: "10px",
                "&:hover": {
                  background: "#FF7A00",
                },
                color: "#fff",
                fontSize: "18px",
                fontWeight: "500",
              }}
              onClick={handleConfirmRestrict}
            >
              Confirm
            </Button>
            <Button
              sx={{
                height: "50px",
                border: "1px solid #000",
                width: "140px",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "500",
                color: "#000",
              }}
              onClick={handleClose}
            >
              Discard
            </Button>
          </div>
        </div>
      </MembershipManagementModal>
    </Fragment>
  );
};

export default MembershipManagementList;
