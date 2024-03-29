import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import styles from "./Notification.module.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "./DeleteIcon";
import DeleteNotifIcon from "./DeleteNotifIcon";

const notifOption = [
    {
        name: "Companies",
    },
    {
        name: "Enabler",
    },
];

const dummyDatas = [
    {
        title: "Content Moderator",
        message:
            "CushyRental posted an article about “Boarding House Finders Program”asdasdasdasdasd",
    },
    {
        title: "Content Moderator",
        message:
            "CushyRental posted an article about “Boarding House Finders Program”asdasdasdasdasasdasdasda",
    },
];

const NotificationList = () => {
    const [activeButton, setButtonActive] = useState(1);
    const [isDelete, setIsDelete] = useState(false);
    const [dummyData, setDummyData] = useState(dummyDatas);

    const buttonOptionHandler = (index) => {
        setButtonActive(index);
    };

    const deleteButtonHandler = () => {
        setIsDelete(prevIsDelete => !prevIsDelete)
    }

    const deleteNotifHandler = (event, dataIndex) => {
        event.preventDefault();
        setDummyData(dummyData.filter((data, index) => index != dataIndex))
    }

    const optionButton = notifOption.map((button, index) => (
        <Button
            key={index}
            onClick={() => buttonOptionHandler(index)}
            sx={{
                height: "39px",
                background: activeButton === index ? "#5C9FEF" : "inherit",
                color: "#3D3D3D",
                fontWeight: "700",
                fontSize: "16px",
                borderRadius: "18px",
                padding: "10px 24px",
                textTransform: 'capitalize',
                "&:hover": {
                    background: activeButton === index ? "#5C9FEF" : "inherit",
                },
                transition: "background 0.3s ease-in-out",
            }}
        >
            {button.name}
        </Button>
    ));

    const content = dummyData.map((data, index) => (
        <Link to={'/dashboard'} key={index} className={`${styles["notif"]}`}>
            {isDelete && <IconButton onClick={(event) => deleteNotifHandler(event, index)}
                sx={{
                    height: "48px",
                    width: "48px",
                    background: "#FF6363",
                    "&:hover": { background: "#FF6363" },
                }}
            >
                <DeleteNotifIcon />
            </IconButton>}

            <div className={`${styles["notif-message"]}`}>
                <h1>{data.title}</h1>
                <p>{data.message}</p>
            </div>
        </Link>
    ));

    return (
        <Fragment>
            <div className={`${styles["option"]}`}>
                <div className={`${styles["option-button"]}`}>
                    {optionButton}
                </div>
                <div className={`${styles["delete-button"]}`}>
                    {isDelete ? <Button sx={{textTransform: 'capitalize', fontSize: '16px'}} onClick={deleteButtonHandler}>Cancel</Button> : <IconButton aria-label="delete" onClick={deleteButtonHandler}>
                        <DeleteIcon />
                    </IconButton>}
                </div>
            </div>

            <div className={`${styles["notifs"]}`}>
                {content}

                {/* This is the notif when visited/read na */}
                <Link className={`${styles["notif"]} ${styles["read"]}`}>
                    <IconButton
                        sx={{
                            height: "48px",
                            width: "48px",
                            background: "#FF6363",
                            "&:hover": { background: "#FF6363" },
                        }}
                    >
                        <DeleteNotifIcon />
                    </IconButton>

                    <div className={`${styles["notif-message"]}`}>
                        <h1>Content Moderation</h1>
                        <p>
                            CushyRental posted an article about “Boarding House
                            Finders Program”asdasdasdasdasd
                        </p>
                    </div>
                </Link>
            </div>
        </Fragment>
    );
};

export default NotificationList;
