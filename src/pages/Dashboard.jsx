import React from 'react'
import { Link } from 'react-router-dom';

// Components
import Topbar from '../components/Topbar/Topbar'

// Icons
import {
  Group as MemberIcon,
  LibraryBooks as ContentIcon, 
  Send as SendIcon,
  Settings as SettingIcon,
  WidthFull,
} from '@mui/icons-material';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ChromeReaderModeRoundedIcon from '@mui/icons-material/ChromeReaderModeRounded';


function Dashboard() {
  // get token from the cookie
  return (
    <div>
        <Topbar />
        <div className="container-body">
          <h1 className='heading-1 flex justify-center'>
            BiNNO Dashboard
          </h1>
          
          <div className="navigation-controller container flex flex-col items-center justify-center p-5 m-5
          border-double border-2 border-sky-500">
            <div className='flex flex-row'>
              <button className='bg-orange-500 m-3 p-10 text-xl text-white rounded-2xl w-96 flex flex-col items-center justify-center'>
                <AccountCircleRoundedIcon />
                Members
              </button>
              <button className='bg-orange-300 m-3 p-10 text-xl text-white rounded-2xl flex flex-col items-center justify-center'>
                <SendRoundedIcon />
                Notify
              </button>
            </div>
            

            <div className='flex flex-row '>
              <button className='bg-orange-500 m-3 p-10 text-xl text-white rounded-2xl flex flex-col items-center justify-center'>
                <TuneRoundedIcon />
                System
              </button>
              <button className='bg-orange-300 m-3 p-10 text-xl text-white rounded-2xl w-96 flex flex-col items-center justify-center'>
                <ChromeReaderModeRoundedIcon />
                Contents
              </button>
            </div>
          </div>


          <div className="recent-list flex flex-col items-center justify-center mt-10 border-solid border-2 border-sky-500">
            <h1 className='text-3xl font-bold flex'>Recent Activities</h1>
            <div className='flex flex-row '>
                <div className='flex flex-col m-10 border-solid border-2 border-sky-500'>
                  <h1>
                    Admin
                  </h1>
                </div>

                <div>
                    <h1 className='flex flex-col m-10 border-solid border-2 border-sky-500'>
                      Members
                    </h1>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
