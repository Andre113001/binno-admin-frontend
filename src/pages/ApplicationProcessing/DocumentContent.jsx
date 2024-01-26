import { Button } from '@mui/material'
import styles from './ApplicationProcessing.module.css'
import EnablerImage from './EnablerImage'
import Dropdown from '../../components/Dropdowmn/Dropdown'
import Moment from 'react-moment'
import { useState } from 'react'

import useHttp from '../../hooks/http-hook'

const Document = (props) => {
    const { appDocs } = props

    const { sendRequest, isLoading } = useHttp()

    const [selected, setSelected] = useState(1)

    const handleSelect = (e) => {
        setSelected(e)
    }

    const handleConfirm = async () => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/application`,
            method: 'PATCH',
            body: JSON.stringify({
                appId: appDocs.app_id,
                isApproved: selected === 1 ? true : false,
            }),
        })

        // ilapag ang code ng email; 
    }
    return (
        <div className={`${styles['main']}`}>
            <div className={`${styles['date-and-number']}`}>
                <div className={`${styles['number']}`}>
                    <p>#{appDocs.app_id}</p>
                </div>

                <div className={`${styles['date']}`}>
                    <p>
                        <Moment format="MM-DD-YYYY">
                            {appDocs.app_datecreated}
                        </Moment>
                    </p>
                </div>
            </div>

            <div className={`${styles['enabler-title-section']}`}>
                <div className={`${styles['enabler-title']}`}>
                    <h1>{appDocs.app_institution}</h1>
                    <p>Interview Status: Processing</p>
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
                        {appDocs.app_type === 'TBI'
                            ? '(Technology Business Incubators)'
                            : appDocs.app_type === 'LGU'
                            ? '(Local Government Unit)'
                            : appDocs.app_type === 'SUC'
                            ? '(State Univerities & Colleges)'
                            : ''}
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
                            color: '#000',
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
        </div>
    )
}

export default Document
