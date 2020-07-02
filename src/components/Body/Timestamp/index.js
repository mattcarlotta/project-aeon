import { Component } from "react";
import PropTypes from "prop-types";
import Details from "~components/Body/Details";
import NoSSR from "~components/Body/NoSSR";
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

  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.date !== this.props.date || nextState.date !== this.state.date;

  componentDidUpdate(prevProps) {
    const { date } = this.props;
    if (prevProps.date !== date && this.timeRef) {
      this.removeUpdates();
      this.setState(
        { date: dayjs(this.props.date).fromNow() },
        this.setUpdateInterval
      );
    }
  }

  componentWillUnmount() {
    this.removeUpdates();
  }

  removeUpdates = () => clearInterval(this.timestampInterval);

  setUpdateInterval = () => {
    this.timestampInterval = setInterval(() => {
      if (this.timeRef)
        this.setState({ date: dayjs(this.props.date).fromNow() });
    }, 60000);
  };

  render = () => (
    <NoSSR>
      <Tooltip title={this.state.title}>
        <Details ref={node => (this.timeRef = node)}>
          {this.props.updated && <>Updated </>}
          {this.state.date}
        </Details>
      </Tooltip>
    </NoSSR>
  );
}

Timestamp.propTypes = {
  date: PropTypes.string.isRequired,
  updated: PropTypes.bool
};

export default Timestamp;
