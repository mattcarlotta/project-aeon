import PropTypes from "prop-types";
import NoSSR from "~components/Body/NoSSR";
import QuestionDetails from "~components/Body/QuestionDetails";
import Tooltip from "~components/Body/Tooltip";
import dayjs from "~utils/dayjs";

const Timestamp = ({ date }) => (
  <NoSSR>
    <Tooltip title={dayjs(date).format("MMMM Do, YYYY @ hh:mma")}>
      <QuestionDetails>{dayjs(date).fromNow()}</QuestionDetails>
    </Tooltip>
  </NoSSR>
);

Timestamp.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Timestamp;
