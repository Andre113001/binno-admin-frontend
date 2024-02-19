import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ActivityMonitoring";

const ActivityMonitoringList = () => {
    return (
        <Fragment>
            {/* <td>
                <p>08-02-2023</p>
            </td>
            <td className={`${styles["activity-col"]}`}>
                <div className={`${styles["activitymanagement-request-data"]}`}>
                    <div>Name of Author</div>
                </div>
            </td> */}
            <td className={`${styles["action"]}`}>
                <div className={`${styles["action-button"]}`}>

                    <div className={`${styles["border"]}`}></div>

                    <div className={`${styles["schedule"]}`}>
                        <div>Name of Activity</div>
                    </div>
                </div>
            </td>
            <td className={`${styles["action"]}`}>
                <div className={`${styles["action-button"]}`}>

                    <div className={`${styles["border"]}`}></div>

                    <div className={`${styles["schedule"]}`}>
                        <div>Activity Date</div>
                    </div>
                </div>
            </td>


        </Fragment>
    );
};

export default ActivityMonitoringList;
