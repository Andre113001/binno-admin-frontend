import DocumentContent from './DocumentContent'
import ScheduleContent from './ScheduleContent'

const ApplicationProcessingModalContent = (props) => {
    const { type, appDocs } = props

    return type == 1 ? (
        <DocumentContent appDocs={appDocs} />
    ) : (
        <ScheduleContent appDocs={appDocs} />
    )
}

export default ApplicationProcessingModalContent
