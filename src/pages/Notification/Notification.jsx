import { Fragment } from "react";
import Topbar from "./Topbar/Topbar";

import styles from './Notification.module.css';
import NotificationList from "./NotificationList";
import ClickableComponent from "./NotificationList";

const Notification = () => {
    return <Fragment>
        <Topbar/>

        <main className={`${styles['container']}`}>
            <div className={`${styles['main']}`}>
                <h1>Announcements</h1>

                <div className={styles.hr}></div>

                <NotificationList/>
            </div>
        </main>
    </Fragment>;
};

export default Notification;