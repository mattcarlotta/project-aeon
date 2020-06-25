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
      date: dayjs(props.date).fromNow(),
      title: dayjs(props.date).format("MMMM Do, YYYY @ hh:mma")
    };
  }

  componentDidMount() {
    this.setUpdateInterval();
  }

  shouldComponentUpdate = (_, nextState) => nextState.date !== this.state.date;

  componentWillUnmount() {
    clearInterval(this.timestampInterval);
  }

  setUpdateInterval = () => {
    this.timestampInterval = setInterval(() => {
      if (this.timeRef)
        this.setState({ date: dayjs(this.props.date).fromNow() });
    }, 60000);
  };

  render = () => (
    <NoSSR>
      <Tooltip title={this.state.title}>
        <QuestionDetails ref={node => (this.timeRef = node)}>
          {this.state.date}
        </QuestionDetails>
      </Tooltip>
    </NoSSR>
  );
}

Timestamp.propTypes = {
  date: PropTypes.string.isRequired
};

export default Timestamp;
