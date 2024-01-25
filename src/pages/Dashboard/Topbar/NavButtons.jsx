import Button from '@mui/material/Button'
import { Fragment, useState } from 'react'
import ArrowIcon from './ArrowIcon'
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { useNavigate } from 'react-router-dom'

const NavButtons = () => {
    const [activeButton, setActiveButton] = useState(0)
    const navigate = useNavigate()

    const buttons = [
        {
            icon: <NearMeOutlinedIcon style={{ fontSize: '24px' }} />,
            name: 'Dasnboard',
            redirect: '/',
        },
        {
            icon: <CalendarMonthOutlinedIcon style={{ fontSize: '24px' }} />,
            name: 'Calendar',
            redirect: '/calendar',
        },
        {
            icon: (
                <NotificationsNoneOutlinedIcon style={{ fontSize: '24px' }} />
            ),
            name: 'Notification',
            redirect: '/',
        },
    ]

    const buttonHandler = (index) => {
        setActiveButton(index)

        // logic here...
    }

    const content = buttons.map((button, index) => {
        return (
            <Button
                key={index} // Use a unique identifier if available
                startIcon={button.icon}
                onClick={() => {
                    buttonHandler(index)
                    navigate(`${button.redirect}`)
                }}
                sx={{
                    fontSize: '16px',
                    height: '42px',
                    background: index === activeButton ? '#FF7A00' : 'inherit',
                    borderRadius: '18px',
                    color: index === activeButton ? '#fff' : '#000',
                    textTransform: 'capitalize',
                    padding: '0 24px',
                    '&:hover': {
                        backgroundColor:
                            index === activeButton ? '#ff9533' : 'inherit',
                        '& svg': {
                            color: index === activeButton ? '#fff' : '#000',
                        },
                    },
                    '& svg': {
                        color: index === activeButton ? '#fff' : '#000',
                        transition: 'color 0.4s ease-in-out',
                    },
                    transition:
                        'color 0.4s ease-in-out, background 0.4s ease-in-out',
                }}
            >
                {button.name}
            </Button>
        )
    })

    return <Fragment>{content}</Fragment>
}

export default NavButtons
