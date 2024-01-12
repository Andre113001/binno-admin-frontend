import { Fragment } from "react";

import Topbar from "./Topbar/Topbar";
import MembersIcon from "./MembersIcon";
import NewsLetterSubscriberIcon from "./NewsLetterSubscriberIcon";
import StartUpIcon from "./StartUpIcon";
import { Link } from "react-router-dom";
import PendingPostIcon from "./PendingPostIcon";
import ContentIcon from "./ContentIcon";

import styles from "./Dashboard.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PendingMembersIcon from "./PendingMembersIcon";
import { Button, IconButton } from "@mui/material";


const Dashboard = () => {
    return (
        <Fragment>
            <Topbar />

            <div className={`${styles["container"]}`}>
                <main className={`${styles["main-contents"]}`}>
                    <div className={`${styles["overview"]}`}>
                        <h1>Report Overview</h1>

                        <div className={`${styles["overview-content"]}`}>
                            <Link className={`${styles["overview-col"]}`}>
                                <ContentIcon />

                                <div className={`${styles["overview-data"]}`}>
                                    <div className={`${styles["number"]}`}>
                                        25
                                    </div>
                                    <p>CONTENTS</p>
                                </div>
                            </Link>

                            <Link className={`${styles["overview-col"]}`}>
                                <MembersIcon />

                                <div className={`${styles["overview-data"]}`}>
                                    <div className={`${styles["number"]}`}>
                                        25
                                    </div>
                                    <p>MEMBERS</p>
                                </div>
                            </Link>

                            <Link className={`${styles["overview-col"]}`}>
                                <NewsLetterSubscriberIcon />

                                <div className={`${styles["overview-data"]}`}>
                                    <div className={`${styles["number"]}`}>
                                        25
                                    </div>
                                    <p>NEWSLETTER SUBSCRIBER</p>
                                </div>
                            </Link>

                            <Link className={`${styles["overview-col"]}`}>
                                <StartUpIcon />

                                <div className={`${styles["overview-data"]}`}>
                                    <div className={`${styles["number"]}`}>
                                        25
                                    </div>
                                    <p>START-UP ENABLERS</p>
                                </div>
                            </Link>

                            <Link className={`${styles["overview-col"]}`}>
                                <StartUpIcon />

                                <div className={`${styles["overview-data"]}`}>
                                    <div className={`${styles["number"]}`}>
                                        25
                                    </div>
                                    <p>STARTUP COMPANIES</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles['pending-content']}`}>
                        <div className={`${styles['pending']}`}>
                            <div className={`${styles['pending-icon']}`}>
                                <PendingPostIcon/>
                            </div>

                            <div className={`${styles['pending-data']}`}>
                                <p className={`${styles['data']}`}>PENDING POST</p>
                                <p className={`${styles['pending-number']}`}>10</p>
                            </div>

                            <IconButton className={styles.button}>
                                <ArrowForwardIosIcon style={{height: '48px', width: '48px', color: '#000'}} />
                            </IconButton>
                        </div>

                        <div className={`${styles['pending']}`}>
                            <div className={`${styles['pending-icon']}`}>
                                <PendingMembersIcon/>
                            </div>

                            <div className={`${styles['pending-data']}`}>
                                <p className={`${styles['data']}`}>PENDING POST</p>
                                <p className={`${styles['pending-number']}`}>10</p>
                            </div>

                            <IconButton className={styles.button}>
                                <ArrowForwardIosIcon style={{height: '48px', width: '48px', color: '#000'}} />
                            </IconButton>
                        </div>
                    </div>

                    <div className={`${styles['activities-row']}`}>
                        <div className={`${styles['title']}`}>
                            <h2>Recent Activities</h2>
                            <Link className={`${styles['see-all-button']}`}>See All</Link>
                        </div>

                        <div className={`${styles['activities']}`}>
                            <div className={`${styles['activities-list']}`}>
                                <p>Andale uploaded a new post.</p>
                                <p>10:59PM</p>
                            </div>

                            <div className={`${styles['hr']}`}></div>

                            <div className={`${styles['activities-list']}`}>
                            <p>Andale uploaded a new post.</p>
                                <p>10:59PM</p>
                            </div>
                            
                            {/* <div className={`${styles['hr']}`}></div> */}
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};

export default Dashboard;
