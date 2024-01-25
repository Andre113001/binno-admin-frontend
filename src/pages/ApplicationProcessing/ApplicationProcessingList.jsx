import { Fragment } from 'react'

import DocumentIcon from './DocumentIcon'
import ScheduleIcon from './ScheduleIcon'
import CustomModal from '../../components/CustomModal/CustomModal'

import Moment from 'react-moment'

import styles from './ApplicationProcessing.module.css'
import RespondIcon from './RespondIcon'

const ApplicationProcessingList = (props) => {
    const { onOpenModal, application } = props

    const documentHandler = (type, application) => {
        onOpenModal(type, application)
    }

    return (
        <Fragment>
            <td>
                <p>
                    <Moment format="MM/DD/YYYY">
                        {application.app_dateadded}
                    </Moment>
                </p>
            </td>
            <td>
                <p>{application.app_institution}</p>
            </td>
            <td>
                <p>{application.app_address}</p>
            </td>
            <td>
                <p>{application.app_email}</p>
            </td>
            <td className={`${styles['action']}`}>
                <div className={`${styles['action-button']}`}>
                    <div className={`${styles['document']}`}>
                        <div onClick={() => documentHandler(1, application)}>
                            <DocumentIcon />
                        </div>
                        <button
                            onClick={() => documentHandler(1, application)}
                            className={`${styles['document-button']}`}
                        >
                            View documents
                        </button>
                    </div>
                    <div className={`${styles['schedule']}`}>
                        {/* <ScheduleIcon /> */}
                        <div onClick={() => documentHandler(2, application)}>
                            <RespondIcon />
                        </div>
                        <button
                            onClick={() => documentHandler(2, application)}
                            className={`${styles['schedule-button']}`}
                        >
                            Set a schedule
                        </button>
                    </div>
                </div>
            </td>
        </Fragment>
    )
}

export default ApplicationProcessingList
