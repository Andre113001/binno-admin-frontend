import { Fragment } from "react";
import Moment from "react-moment";

const ActivitiesList = (props) => {
  const item = props.item;

  // Convert history_datecreated to a JavaScript Date object
  const originalDate = new Date(item.history_datecreated);

  // Add 8 hours to the original date
  const newDate = new Date(originalDate.getTime() - 8 * 60 * 60 * 1000);

  return (
    <Fragment>
      <td>{item.history_id}</td>
      <td>{item.history_author}</td>
      <td>{item.history_text}</td>
      <td>
        {/* Render the new date using Moment */}
        <Moment format="MMMM DD, YYYY | hh:mm A">{newDate}</Moment>
      </td>
    </Fragment>
  );
};

export default ActivitiesList;
