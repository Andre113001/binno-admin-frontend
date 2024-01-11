import { Button } from "@mui/material";
import styles from "./ApplicationProcessing.module.css";
import EnablerImage from "./EnablerImage";
import Dropdown from "../../components/Dropdowmn/Dropdown";

const Document = () => {
    return (
        <div className={`${styles["main"]}`}>
            <div className={`${styles["date-and-number"]}`}>
                <div className={`${styles["number"]}`}>
                    <p>1002-2203-2123</p>
                </div>

                <div className={`${styles["date"]}`}>
                    <p>01 - 02- 2023</p>
                </div>
            </div>

            <div className={`${styles["enabler-title-section"]}`}>
                <div className={`${styles["enabler-title"]}`}>
                    <h1>Startup Enabler Name</h1>
                    <p>Interview Status: Processing</p>
                </div>

                <div className={`${styles["enabler-info"]}`}>
                    <p>
                        <b>From:</b> Juan Dela Cruz
                    </p>
                    <p>
                        <b>Address:</b> Legazpi City, Albay
                    </p>
                    <p>
                        <b>Type:</b> Startup Enabler (Local Government Unit)
                    </p>
                </div>
            </div>

            <div className={`${styles["enabler-document"]}`}>
                <div className={`${styles["file"]}`}>
                    <h1>Document</h1>
                    <EnablerImage />
                </div>

                <div className={`${styles["enabler-button"]}`}>
                    <Dropdown
                        style={{
                            height: "44px",
                            width: "256px",
                            background: "#D9D9D9",
                            borderRadius: "10px",
                            fontWeight: "700",
                        }}
                    />
                    <Button
                        sx={{
                            background: "#FF7A00",
                            height: "48px",
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: "700",
                            width: "268px",
                            borderRadius: "30px",
                            "&:hover": {
                                background: "#FF7A00",
                            },
                        }}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Document;
