import { Component } from "react";
import PropTypes from "prop-types";
import NoSSR from "~components/Body/NoSSR";
import QuestionDetails from "~components/Body/QuestionDetails";
import Tooltip from "~components/Body/Tooltip";
import dayjs from "~utils/dayjs";

class Timestamp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date
    };
  }

  componentDidMount() {
    this.setUpdateInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timestampInterval);
  }

  setUpdateInterval = () => {
    this.timestampInterval = setInterval(() => {
      if (this.timeRef) this.forceUpdate();
    }, 1000);
  };

  render = () => (
    <NoSSR>
      <Tooltip title={dayjs(this.state.date).format("MMMM Do, YYYY @ hh:mma")}>
        <QuestionDetails ref={node => (this.timeRef = node)}>
          {dayjs(this.state.date).fromNow()}
        </QuestionDetails>
      </Tooltip>
    </NoSSR>
  );
}

Timestamp.propTypes = {
  date: PropTypes.string.isRequired
};

export default Timestamp;
