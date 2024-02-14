import Button from '@mui/material/Button';
import { Fragment, useState } from 'react';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Person, AccessTime } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom';

const NavButtons = () => {
    const [activeButton, setActiveButton] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const buttons = [
        {
            icon: <NearMeOutlinedIcon style={{ fontSize: '24px' }} />,
            name: 'Dashboard',
            redirect: '/dashboard',
        },
        {
            icon: <CalendarMonthOutlinedIcon style={{ fontSize: '24px' }} />,
            name: 'Calendar',
            redirect: '/calendar',
        },
        {
            icon: <Person style={{ fontSize: '24px' }}/>,
            name: 'Members',
            redirect: '/admin/membership_management'
        },
        {
            icon: <AccessTime style={{ fontSize: '24px' }}/>,
            name: 'Activities',
            redirect: '/admin/membership_management/members'
        },
        // {
        //     icon: (
        //         <NotificationsNoneOutlinedIcon style={{ fontSize: '24px' }} />
        //     ),
        //     name: 'Notification',
        //     redirect: '/',
        // },
    ];

    const buttonHandler = (index) => {
        setActiveButton(index);
    };

    const content = buttons.map((button, index) => {
        const isActive = location.pathname === button.redirect;

        return (
            <Button
                key={index}
                startIcon={button.icon}
                onClick={() => {
                    buttonHandler(index);
                    navigate(`${button.redirect}`);
                }}
                sx={{
                    fontSize: '16px',
                    height: '42px',
                    background: isActive ? '#FF7A00' : 'inherit',
                    borderRadius: '18px',
                    color: isActive ? '#fff' : '#000',
                    textTransform: 'capitalize',
                    padding: '0 24px',
                    '&:hover': {
                        backgroundColor: isActive ? '#ff9533' : 'inherit',
                        '& svg': {
                            color: isActive ? '#fff' : '#000',
                        },
                    },
                    '& svg': {
                        color: isActive ? '#fff' : '#000',
                        transition: 'color 0.4s ease-in-out',
                    },
                    transition:
                        'color 0.4s ease-in-out, background 0.4s ease-in-out',
                }}
            >
                {button.name}
            </Button>
        );
    });

    return <Fragment>{content}</Fragment>;
};

export default NavButtons;
