import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'


// Components
// import Sidebar from '../components/Sidebar/Sidebar';
import Button from '../components/Button/Button';
import Back from '../components/Back/Back';
import MemberNav from '../components/MemberNav/MemberNav';
import {Delete as DeleteIcon, Send as SendIcon} from '@mui/icons-material';
import Sidebar from '../components/Sidebar/Sidebar';


function Members() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/api/get')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Sidebar />
            <div className='mb-4'>
                <div className="container">
                    <Back link='/dashboard' />
                    <span className='heading-1'>Members</span>
                    <MemberNav />
                    <div className="search_input">

                    </div>
                <table className='table-auto border w-full mt-5'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Institution</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody className='border'>
                    {data.map((item) => (
                        <tr key={item.member_id}>
                        <td>{item.member_id}</td>
                        <td>{item.member_institution}</td>
                        <td>{item.email_address}</td>
                        <td className='flex'>
                            <div className="member_options flex items-center space-x-4">
                                <div className="member_option flex items-center space-x-1 cursor-pointer text-red-400">
                                    <DeleteIcon />
                                    <span>Quarantine</span>
                                </div>
                                <div className="member_option flex items-center space-x-1 cursor-pointer text-purple-500">
                                    <SendIcon />
                                    <span>Notify</span>
                                </div>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Members
