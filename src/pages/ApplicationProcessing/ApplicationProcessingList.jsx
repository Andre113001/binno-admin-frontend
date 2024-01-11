import { Fragment } from "react";

import DocumentIcon from "./DocumentIcon";
import ScheduleIcon from "./ScheduleIcon";
import CustomModal from "../../components/CustomModal/CustomModal";

import styles from "./ApplicationProcessing.module.css";
import RespondIcon from "./RespondIcon";

const ApplicationProcessingList = (props) => {
    const { onOpenModal } = props;

    const documentHandler = (type) => {
        onOpenModal(type);
    };

    return (
        <Fragment>
            <td>
                <p>08-02-2023</p>
            </td>
            <td>
                <p>Name of Institution</p>
            </td>
            <td>
                <p>Inascan, Guinobatan, Albay</p>
            </td>
            <td>
                <p>otillajohn09@gmail.com</p>
            </td>
            <td className={`${styles["action"]}`}>
                <div className={`${styles["action-button"]}`}>
                    <div className={`${styles["document"]}`}>
                        <div onClick={() => documentHandler(1)}>
                            <DocumentIcon />
                        </div>
                        <button
                            onClick={() => documentHandler(1)}
                            className={`${styles["document-button"]}`}
                        >
                            View documents
                        </button>
                    </div>
                    <div className={`${styles["schedule"]}`}>
                        {/* <ScheduleIcon /> */}
                        <div onClick={() => documentHandler(2)}>
                            <RespondIcon />
                        </div>
                        <button
                            onClick={() => documentHandler(2)}
                            className={`${styles["schedule-button"]}`}
                        >
                            Set a schedule
                        </button>
                    </div>
                </div>
            </td>
        </Fragment>
    );
};

export default ApplicationProcessingList;
