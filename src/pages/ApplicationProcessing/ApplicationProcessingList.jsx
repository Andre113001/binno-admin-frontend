import { Fragment } from 'react'
import DocumentIcon from './DocumentIcon'
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
                <p>{application.app_id}</p>
            </td>
            <td>
                <b>
                    <p>{application.app_institution}</p>
                </b>
            </td>
            <td>
                <p>{application.app_address}</p>
            </td>
            <td>
                <a className={`${styles['app-email']}`} href={`mailto:${application.app_email}`}>{application.app_email}</a>
            </td>
            <td className={`${styles['action']}`}>
                <div className={`${styles['action-button']}`}>
                    <div onClick={() => documentHandler(1, application)}>
                        <DocumentIcon />
                    </div>
                    <button
                        onClick={() => documentHandler(1, application)}
                        className={`${styles['document-button']}`}
                    >
                        View Application
                    </button>
                </div>
            </td>
        </Fragment>
    )
}

export default ApplicationProcessingList
