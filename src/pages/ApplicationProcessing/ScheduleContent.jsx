import { useState } from "react";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import RadioButton from "../../components/RadioButton/RadioButton";

import styles from "./ApplicationProcessing.module.css";

const ScheduleContent = (props) => {
    const [zoomLink, setZoomLink] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");

    const zoomLinkChangeHandler = (event) => {
        setZoomLink(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        console.log("Hello John C. Otilla");
    };

    return (
        <div className={`${styles["main"]}`}>
            <div className={`${styles["schedule-title"]}`}>
                <h1>Schedule</h1>
            </div>

            <div className={`${styles["schedule-type"]}`}>
                <RadioButton
                    data={["Zoom", "Face-to-face"]}
                    style={{ gap: "230px" }}
                />
            </div>

            <form
                onSubmit={submitHandler}
                className={`${styles["schedule-form"]}`}
            >
                <div className={`${styles["schedule-row"]}`}>
                    <input
                        type="text"
                        onChange={zoomLinkChangeHandler}
                        placeholder="Paste here: https://zoom"
                    />
                    <Button
                        variant="text"
                        sx={{
                            height: "66px",
                            background: "#066ADE",
                            color: "#FFFAFA",
                            fontSize: "16px",
                            "&:hover": {
                                background: "#066ADE",
                            },
                            fontWeight: "700",
                            borderRadius: "7px",
                        }}
                    >
                        Get Zoom Link
                    </Button>
                </div>

                <div className={`${styles["date-row"]}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: "76px",
                                    width: "100%",
                                },
                                width: "100%",
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <Button
                    variant="text"
                    sx={{
                        width: "232px",
                        height: "66px",
                        background: "#FB7901",
                        color: "#fff",
                        fontSize: "16px",
                        "&:hover": {
                            background: "#FB7901",
                        },
                        fontWeight: "700",
                        borderRadius: "0px",
                    }}
                >
                    Send as Email
                </Button>
            </form>
        </div>
    );
};

export default ScheduleContent;
