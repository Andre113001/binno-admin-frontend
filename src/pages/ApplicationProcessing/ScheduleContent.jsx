import { useState } from 'react';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

import RadioButton from '../../components/RadioButton/RadioButton';

import styles from './ApplicationProcessing.module.css';

const ScheduleContent = (props) => {
    const application = props.appDocs;
    const [zoomLink, setZoomLink] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [selected, setSelected] = useState('Zoom');

    const zoomLinkChangeHandler = (event) => {
        setZoomLink(event.target.value);
    };

    const handleSelect = (newValue) => {
        setSelected(newValue);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const type = selected === 'Zoom' ? 'zoom' : 'f2f';

        // Extract the form values
        const formData = {
            type: type,
            schedDate: '2024-02-18', // fix format application_date
            schedAppId: application.app_id,
            schedZoomLink: zoomLink,
            schedStart: '15:00:00', // Fix
            schedEnd: '18:00:00', // Fix 
            receiver: application.app_email,
            username: application.app_institution
        };
        // Pass the form data to the handler
        // props.onSubmit(formData);
        const res = await axios.post('http://localhost:3100/api/schedule/sched-post', formData);

        console.log(res.data);
    };

    return (
        <div className={`${styles['main']}`}>
            <div className={`${styles['schedule-title']}`}>
                <h1>Schedule</h1>
            </div>

            <div className={`${styles['schedule-type']}`}>
                <RadioButton
                    onSelect={handleSelect}
                    selected={selected}
                    data={['Zoom', 'Face-to-face']}
                    style={{ gap: '230px' }}
                />
            </div>

            <form
                onSubmit={submitHandler}
                className={`${styles['schedule-form']}`}
            >
                {selected === 'Zoom' && (
                    <div className={`${styles['schedule-row']}`}>
                        <input
                            type="text"
                            onChange={zoomLinkChangeHandler}
                            placeholder="Paste here: https://zoom"
                        />
                        <Button
                            variant="text"
                            sx={{
                                height: '66px',
                                background: '#066ADE',
                                color: '#FFFAFA',
                                fontSize: '16px',
                                '&:hover': {
                                    background: '#066ADE',
                                },
                                fontWeight: '700',
                                borderRadius: '7px',
                            }}
                            onClick={() => window.open('https://zoom.com', '_blank')}
                        >
                            Get Zoom Link
                        </Button>
                    </div>
                )}
                <div className={`${styles['date-row']}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '76px',
                                    width: '100%',
                                },
                                width: '100%',
                            }}
                            // Assume you have a onChange handler for DatePicker that updates scheduleDate state
                            onChange={(newValue) => setScheduleDate(newValue)}
                        />
                        <TimePicker
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '76px',
                                    width: '100%',
                                    marginTop: 2,
                                },
                                width: '100%',
                            }}
                            // Assume you have a onChange handler for TimePicker that updates scheduleDate state
                            onChange={(newValue) => setScheduleTime(newValue)}
                        />
                    </LocalizationProvider>
                </div>

                <Button
                    type="submit" // Add type="submit" to trigger form submission
                    variant="text"
                    sx={{
                        width: '232px',
                        height: '66px',
                        background: '#FB7901',
                        color: '#fff',
                        fontSize: '16px',
                        '&:hover': {
                            background: '#FB7901',
                        },
                        fontWeight: '700',
                        borderRadius: '0px',
                    }}
                >
                    Send
                </Button>
            </form>
        </div>
    );
};

export default ScheduleContent;
