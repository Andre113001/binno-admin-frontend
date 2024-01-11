import DocumentContent from "./DocumentContent";
import ScheduleContent from "./ScheduleContent";


const ApplicationProcessingModalContent = (props) => {
    const {type} = props;

    return type === 1 ? <DocumentContent /> : <ScheduleContent/>;
};

export default ApplicationProcessingModalContent;
