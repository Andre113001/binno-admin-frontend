import { Button, CircularProgress } from '@mui/material';
import styles from './ApplicationProcessing.module.css';
import EnablerImage from './EnablerImage';
import Dropdown from '../../components/Dropdowmn/Dropdown';
import ApplicationProcessingModalSchedule from './ApplicationProcessingModalSchedule';
import ApplicationProcessingModalContent from './ApplicationProcessingModalContent';
import Moment from 'react-moment';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/http-hook';

const DocumentContent = (props) => {
    const { appDocs} = props;
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const { sendRequest, isLoading } = useHttp();

    const [selected, setSelected] = useState(1);
    const [ schedule, setSchedule ] = useState();
    const [loadingSchedule, setLoadingSchedule] = useState(false); // State to track loading state

    const handleSelect = (e) => {
        setSelected(e);
    };

    useEffect(() => {
        const loadSchedule = async () => {
            setLoadingSchedule(true); // Set loading to true while fetching
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/schedule/app-id/${appDocs.app_id}`);
            
            if (res.data !== 'Application Id is not found') {
                setSchedule(moment(res.data[0].sched_date).format('YYYY-MM-DD'));
            } 
            setLoadingSchedule(false); // Set loading to false after fetching
        };

        loadSchedule();
    }, [appDocs]);

    console.log(appDocs);

    const handleButtonClick = () => {
        if (schedule) {
            // Navigate to another page if schedule is set
            navigate(`/calendar?date=${schedule}`);
        } else {
            // Open the modal if schedule is not set
            setOpenModal(true);
        }
    };

    
    const handleConfirm = async () => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/application`,
            method: 'PATCH',
            body: JSON.stringify({
                appId: appDocs.app_id,
                isApproved: selected === 1 ? true : false,
            }),
        });

        console.log(res);

        axios.post('http://localhost:3400/membership/approved', {
            receiver: res.email,
            accesskey: res.randomDigits,
            tmpPassword: res.randomDigits
        },{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    };

    return (
        <div className={`${styles['main']}`}>
            <div className={`${styles['date-and-number']}`}>
                <div className={`${styles['number']}`}>
                    <p>Application ID: </p>
                    <h1>#{appDocs.app_id}</h1>
                </div>

                <div className={`${styles['date']}`}>
                    <p>
                        Application Submitted <br />
                        <Moment format="MMMM DD, YYYY">
                            {appDocs.app_datecreated}
                        </Moment>
                    </p>
                </div>
            </div>

            <div className={`${styles['enabler-title-section']}`}>
                <div className={`${styles['enabler-title']}`}>
                    <h1>{appDocs.app_institution}</h1>
                    <div className={`${styles['schedule-button']}`}>
                        {/* Conditionally render button text */}
                        {loadingSchedule ? (
                            <CircularProgress size={24} /> // Display loading animation while fetching schedule
                        ) : schedule ? (
                            <button onClick={handleButtonClick}>Scheduled Interview <br /> <Moment format='MMM DD, YYYY'>{schedule}</Moment></button>
                        ) : (
                            <button onClick={handleButtonClick}>Set a schedule</button>
                        )}
                    </div>
                </div>

                <div className={`${styles['enabler-info']}`}>
                    <p>
                        <b>From:</b> {appDocs.app_email}
                    </p>
                    <p>
                        <b>Address:</b> {appDocs.app_address}
                    </p>
                    <p>
                        <b>Type:</b> {appDocs.app_type}{' '}
                    </p>
                    <p>
                        {(() => {
                            if (appDocs.app_type === 'Enabler') {
                                if (appDocs.app_class === 'TBI') {
                                    return '(Technology Business Incubators)';
                                } else if (appDocs.app_class === 'LGU') {
                                    return '(Local Government Unit)';
                                } else if (appDocs.app_class === 'SUC') {
                                    return '(State Universities & Colleges)';
                                } else {
                                    return '';
                                }
                            } else {
                                return '';
                            }
                        })()}
                    </p>
                </div>
            </div>

            <div className={`${styles['enabler-document']}`}>
                <div className={`${styles['file']}`}>
                    <h1>Document</h1>
                    <EnablerImage appDocs={appDocs} id={appDocs.app_id} />
                </div>

                <div className={`${styles['enabler-button']}`}>
                    <Dropdown
                        selected={selected}
                        onSelect={handleSelect}
                        style={{
                            height: '44px',
                            width: '256px',
                            background: '#D9D9D9',
                            borderRadius: '10px',
                            fontWeight: '700',
                        }}
                    />
                    <Button
                        sx={{
                            background: '#FF7A00',
                            height: '48px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '700',
                            width: '268px',
                            borderRadius: '30px',
                            '&:hover': {
                                background: '#FF7A00',
                            },
                        }}
                        onClick={handleConfirm}
                    >
                        {!isLoading ? 'Confirm' : 'Confirming...'}
                    </Button>
                </div>
            </div>
            {/* Schedule modal */}
            <ApplicationProcessingModalSchedule
                        open={openModal}
                        handleClose={() => setOpenModal(false)}
                    >
                <ApplicationProcessingModalContent
                    appDocs={appDocs}
                    type={2}
                />
            </ApplicationProcessingModalSchedule>
        </div>
        
    );
};

export default DocumentContent;
