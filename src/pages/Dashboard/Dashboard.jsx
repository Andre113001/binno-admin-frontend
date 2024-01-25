import { Fragment, useEffect, useState } from 'react'

import Topbar from './Topbar/Topbar'
import MembersIcon from './MembersIcon'
import NewsLetterSubscriberIcon from './NewsLetterSubscriberIcon'
import StartUpIcon from './StartUpIcon'
import { Link } from 'react-router-dom'
import PendingPostIcon from './PendingPostIcon'
import ContentIcon from './ContentIcon'

import styles from './Dashboard.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PendingMembersIcon from './PendingMembersIcon'
import { Button, IconButton } from '@mui/material'

import useHttp from '../../hooks/http-hook'
import CircularProgress from '@mui/material/CircularProgress'

const AdminDashboard = () => {
    const { sendRequest, isLoading } = useHttp()

    const [metrics, setMetrics] = useState()

    useEffect(() => {
        const loadData = async () => {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/metrics/contents`,
            })
            const res2 = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/metrics/members`,
            })
            const res3 = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/metrics/newsletter-subscriber`,
            })
            const res4 = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/metrics/enablers`,
            })
            const res5 = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/metrics/companies`,
            })
            const res6 = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/metrics/pending-posts`,
            })
            const res7 = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/metrics/pending-members`,
            })

            setMetrics({
                contents: res,
                members: res2,
                newsletter: res3,
                enablers: res4,
                companies: res5,
                pendingPosts: res6,
                pendingMembers: res7,
            })
        }
        loadData()
    }, [])

    console.log(metrics)
    return (
        <Fragment>
            <Topbar />

            <div className={`${styles['container']}`}>
                <main className={`${styles['main-contents']}`}>
                    <div className={`${styles['overview']}`}>
                        <h1>Report Overview</h1>

                        <div className={`${styles['overview-content']}`}>
                            <Link className={`${styles['overview-col']}`}>
                                <ContentIcon />

                                <div className={`${styles['overview-data']}`}>
                                    <div className={`${styles['number']}`}>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            metrics && metrics.contents
                                        )}
                                    </div>
                                    <p>CONTENTS</p>
                                </div>
                            </Link>

                            <Link
                                className={`${styles['overview-col']}`}
                                to={'/admin/membership_management'}
                            >
                                <MembersIcon />

                                <div className={`${styles['overview-data']}`}>
                                    <div className={`${styles['number']}`}>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            metrics && metrics.members
                                        )}
                                    </div>
                                    <p>MEMBERS</p>
                                </div>
                            </Link>

                            <Link className={`${styles['overview-col']}`}>
                                <NewsLetterSubscriberIcon />

                                <div className={`${styles['overview-data']}`}>
                                    <div className={`${styles['number']}`}>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            metrics && metrics.newsletter
                                        )}
                                    </div>
                                    <p>NEWSLETTER SUBSCRIBER</p>
                                </div>
                            </Link>

                            <Link
                                className={`${styles['overview-col']}`}
                                to={'/admin/membership_management'}
                            >
                                <StartUpIcon />

                                <div className={`${styles['overview-data']}`}>
                                    <div className={`${styles['number']}`}>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            metrics && metrics.enablers
                                        )}
                                    </div>
                                    <p>START-UP ENABLERS</p>
                                </div>
                            </Link>

                            <Link
                                className={`${styles['overview-col']}`}
                                to={'/admin/membership_management'}
                            >
                                <StartUpIcon />

                                <div className={`${styles['overview-data']}`}>
                                    <div className={`${styles['number']}`}>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            metrics && metrics.companies
                                        )}
                                    </div>
                                    <p>STARTUP COMPANIES</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles['pending-content']}`}>
                        {/* <Link
                            className={`${styles['pending']}`}
                            to={'/admin/application_processing'}
                        >
                            <div className={`${styles['pending-icon']}`}>
                                <PendingPostIcon />
                            </div>

                            <div className={`${styles['pending-data']}`}>
                                <p className={`${styles['data']}`}>
                                    PENDING POST
                                </p>
                                <p className={`${styles['pending-number']}`}>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        metrics && metrics.pendingPosts
                                    )}
                                </p>
                            </div>

                            <IconButton className={styles.button}>
                                <ArrowForwardIosIcon
                                    style={{
                                        height: '48px',
                                        width: '48px',
                                        color: '#000',
                                    }}
                                />
                            </IconButton>
                        </Link> */}

                        <Link
                            className={`${styles['pending']}`}
                            to={'/admin/application_processing'}
                        >
                            <div className={`${styles['pending-icon']}`}>
                                <PendingMembersIcon />
                            </div>

                            <div className={`${styles['pending-data']}`}>
                                <p className={`${styles['data']}`}>
                                    PENDING MEMBERS
                                </p>
                                <p className={`${styles['pending-number']}`}>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        metrics && metrics.pendingMembers
                                    )}
                                </p>
                            </div>

                            <IconButton className={styles.button}>
                                <ArrowForwardIosIcon
                                    style={{
                                        height: '48px',
                                        width: '48px',
                                        color: '#000',
                                    }}
                                />
                            </IconButton>
                        </Link>
                    </div>

                    <div className={`${styles['activities-row']}`}>
                        <div className={`${styles['title']}`}>
                            <h2>Recent Activities</h2>
                            <Link className={`${styles['see-all-button']}`}>
                                See All
                            </Link>
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
    )
}

export default AdminDashboard
