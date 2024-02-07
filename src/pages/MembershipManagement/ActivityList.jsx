import { Fragment } from "react";
import moment from "moment";
import Moment from "react-moment";

const ActivitiesList = (props) => {
    const item = props.item;
    console.log(item);
    return (
        <Fragment>
            <td>{item.history_id}</td>
            <td>{item.history_author}</td>
            <td>{item.history_text}</td>
            <td><Moment format="MMMM DD, YYYY | hh:mm A">{item.history_datecreated}</Moment></td>
        </Fragment>
    );
};

export default ActivitiesList;
