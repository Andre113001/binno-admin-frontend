import React, { useState, Fragment, useEffect } from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import moment from 'moment'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// Components
// import Topbar from '../components/Topbar/Topbar'
import Back from '../components/Back/Back'
// import { Calendar as CalendarComponent} from '../components/Calendar/Calendar'

// Other Components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar, Timepicker } from '@mui/x-date-pickers'
import { Divider } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'

// Custom Hooks
import useCustomModal from '../hooks/useCustomModal'

// Icon
import { ScheduleSend, Visibility } from '@mui/icons-material'

import useHttp from '../hooks/http-hook'
import Topbar from '../components/Topbar/Topbar'

const Calendar = () => {
    const { sendRequest, isLoading } = useHttp()
    const { handleOpen, handleClose, CustomModal } = useCustomModal()
    const [modalData, setModalData] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    const [appointments, setAppointments] = useState(null)
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [newSchedDate, setNewSchedDate] = useState('')

    const fetchDate = async (date) => {
        try {
            console.log(date);
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/schedule/${date}`,
            })
            return res
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error.message)
        }
    }

    useEffect(() => {
        const fetchInitialDate = async () => {
            const date = await moment().format('YYYY-MM-DD')
            setSelectedDate(date)
        }

        fetchInitialDate()
    }, [])

    // Function to handle date selection
    const handleDateChange = async (newDate) => {
        const formattedDate = await newDate.format('YYYY-MM-DD')
        setSelectedDate(formattedDate)
    }

    const handlePassdata = async (appointment) => {
        handleOpen()
        setModalData(appointment)
    }

    const handleSubmitReschedule = async (sched_id, res) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/schedule/sched-resched`,
                {
                    scheduleId: sched_id,
                    newDate: newSchedDate.format('YYYY-MM-DD'),
                    newStart: timeStart.format('HH:mm'),
                    newEnd: timeEnd.format('HH:mm'),
                }
            )

            console.log('Response from localhost:3100', response.data)
            // Add any additional logic here based on the response if needed
        } catch (error) {
            console.error('Error making request', error.message)
            // Handle error
            // Return an appropriate status code, but not `res.status` here
        }
        console.log('pressed')
        console.log(
            sched_id,
            ' || ',
            newSchedDate.format('MM-DD-YYYY'),
            ' || ',
            timeStart.format('HH:mm'),
            '||',
            timeEnd.format('HH:mm')
        )
        location.reload()
    }

    useEffect(() => {
        const loadNewDate = async () => {
            setSelectedDate(selectedDate)
            const appointments = await fetchDate(selectedDate)
            setAppointments(appointments)

            // .then((results) => {
            //     setAppointments(results)
            //     console.log(selectedDate, results)
            //     // Update state or perform other actions with the result
            // })
            // .catch((error) => {
            //     console.error('Error: ', error.message)
            // })
        }

        loadNewDate()
    }, [selectedDate])

    const f2fMeeting = () => {
        return (
            <div className="border text-center rounded-md mt-2 bg-orange-200 p-3 text-gray-600">
                <span className="font-bold ">Face-To-Face Meeting</span>
                <br />
                <p>Sili Deli, OSAS Building, Bicol University </p>
            </div>
        )
    }

    const zoomMeeting = (link) => {
        return (
            <div className="border text-center rounded-md mt-2 bg-blue-200 p-3 text-gray-600 cursor-pointer">
                <span className="font-bold ">Zoom Meeting</span>
                <br />
                <a className="element_a" href={link}>
                    {link}
                </a>
            </div>
        )
    }

    return (
        <div>
            <Topbar />
            <div className="container">
                {open && (
                    <CustomModal
                        open={open}
                        handleClose={handleClose}
                        content={
                            <div className="flex">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <div className="w-full flex flex-col">
                                        <div className="flex-1 mb-4">
                                            <span className="mb-10 text-lg">
                                                {modalData.sched_appid}
                                            </span>
                                            <h1 className="text-5xl font-bold">
                                                Reschedule
                                            </h1>
                                            <p className="mb-5 font-bold">
                                                <Moment format="MMMM DD, YYYY">
                                                    {modalData.sched_date}
                                                </Moment>
                                            </p>
                                            <p className="mb-2 text-2xl">
                                                Pick a date
                                            </p>
                                            <DatePicker
                                                value={newSchedDate}
                                                orientation="landscape"
                                                defaultValue={dayjs(
                                                    modalData.sched_date
                                                )}
                                                onChange={(newDate) =>
                                                    setNewSchedDate(newDate)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center mt-4 gap-8">
                                            <div className="flex flex-col">
                                                <p className="mb-1 text-2xl">
                                                    Start
                                                </p>
                                                <TimePicker
                                                    // ampm={false}
                                                    value={timeStart}
                                                    defaultValue={dayjs(
                                                        modalData.sched_timestart
                                                    )}
                                                    onChange={(newTime) =>
                                                        setTimeStart(newTime)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="mb-1 text-2xl">
                                                    End
                                                </p>
                                                <TimePicker
                                                    // ampm={false}
                                                    value={timeEnd}
                                                    defaultValue={dayjs(
                                                        modalData.sched_timedue
                                                    )}
                                                    onChange={(newTime) =>
                                                        setTimeEnd(newTime)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </LocalizationProvider>
                            </div>
                        }
                        additions={
                            <button
                                onClick={() =>
                                    handleSubmitReschedule(modalData.sched_id)
                                }
                                className="btn-blue mt-10"
                            >
                                Submit
                            </button>
                        }
                    />
                )}
                <Back link="/dashboard" />
                <div className="flex row-auto ">
                    <div className="p-4" style={{ flex: 1 }}>
                        <h1 className="element_h1 mb-4">Calendar</h1>
                        <Divider />
                        <div className="mt-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    style={{ width: '100%' }}
                                    date={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div style={{ flex: 2 }}>
                        <div className="p-4">
                            <h3 className="element_h3">Scheduled Interviews</h3>
                            <span>
                                <Moment format="MMMM DD, YYYY">
                                    {selectedDate}
                                </Moment>
                            </span>{' '}
                            {/*It doesn;t load here*/}
                        </div>
                        <div className="p-4 space-y-10  overflow-y-auto">
                            {appointments && appointments.length > 0 ? (
                                appointments.map((appointment) => {
                                    return (
                                        <div
                                            className="space-y-3"
                                            key={appointment.sched_id}
                                        >
                                            {/* Header */}
                                            <span className="font-bold text-xl">
                                                {appointment.sched_appid}
                                            </span>
                                            <div className="flex row-auto justify-between items-center">
                                                <div>
                                                    <h1 className="heading-1">
                                                        {
                                                            appointment.app_institution
                                                        }
                                                    </h1>
                                                </div>
                                                <div className="ml-auto">
                                                    <Link to={'#'}>
                                                        <button className="btn bg-blue-400 flex items-center justify-center space-x-2">
                                                            <Visibility />
                                                            <span>
                                                                View Application
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            handlePassdata(
                                                                appointment
                                                            )
                                                        }
                                                        className="btn-orange flex items-center justify-center space-x-2"
                                                    >
                                                        <ScheduleSend />
                                                        <span>Reschedule</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <h4>{appointment.app_email}</h4>
                                            <span>
                                                <Moment
                                                    format="hh:mm A"
                                                    parse="HH:mm:ss"
                                                >
                                                    {
                                                        appointment.sched_timestart
                                                    }
                                                </Moment>{' '}
                                                -{' '}
                                                <Moment
                                                    format="hh:mm A"
                                                    parse="HH:mm:ss"
                                                >
                                                    {appointment.sched_timedue}
                                                </Moment>
                                            </span>
                                            {appointment.sched_zoomlink &&
                                            appointment.sched_zoomlink.length >
                                                0
                                                ? zoomMeeting(
                                                      appointment.sched_zoomlink
                                                  )
                                                : f2fMeeting()}
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <h1 className="text-6xl font-bold mb-5">
                                        No Scheduled Interview on this Date
                                    </h1>
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Check Applications...
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
