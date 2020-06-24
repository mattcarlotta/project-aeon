import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Grow from "@material-ui/core/Grow";
import QuestionDetails from "~components/Body/QuestionDetails";
import Timestamp from "~components/Body/Timestamp";
import toast from "~components/Body/Toast";
import Link from "~components/Navigation/Link";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
import round from "~utils/round";
import LoadingUserCard from "./LoadingUserCard";
import UserCard from "./UserCard";
import UserDropdown from "./UserDropdown";

const initialState = {
  user: {},
  error: "",
  isMounted: false
};

class QuestionMeta extends Component {
  state = initialState;

  componentDidMount() {
    this.isActive = true;
    document.addEventListener("scroll", this.clearTimer);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.clearTimer);
    this.clearTimer();
    this.isActive = false;
  }

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.isActive) this.setState(initialState);
  };

  setTimer = () => (this.timer = setTimeout(this.showUserDetails, 750));

  fetchUserDetails = async () => {
    let data = {};
    let error = "";
    try {
      const res = await app.get(`/u/${this.props.username}`);
      data = parseData(res);
    } catch (err) {
      error = err;
      toast({ type: "error", message: err.toString() });
    } finally {
      if (this.isActive) this.setState({ user: data, error });
    }
  };

  showUserDetails = () =>
    this.setState({ isMounted: true }, this.fetchUserDetails);

  render = () => {
    const { error, isMounted, user } = this.state;
    const { date, username, views } = this.props;

    return (
      <div css="font-size: 12px;color: #787C7E;position:relative;">
        <QuestionDetails>
          Posted by&nbsp;
          <div
            css="display: inline;cursor: default;"
            onClick={e => e.stopPropagation()}
            onMouseEnter={this.setTimer}
            onMouseLeave={this.clearTimer}
          >
            <Link blue nomargin href="/u/[...slug]" asHref={`/u/${username}`}>
              {username}
            </Link>
            <Grow
              in={isMounted && !error}
              style={{
                transformOrigin: "0 0 0",
                zIndex: !isMounted ? "-1" : "100",
                opacity: !isMounted ? 0 : 1
              }}
              timeout={{ enter: 500, leave: 100 }}
            >
              <UserDropdown>
                {!isEmpty(user) ? (
                  <UserCard {...user} />
                ) : isMounted ? (
                  <LoadingUserCard />
                ) : null}
              </UserDropdown>
            </Grow>
          </div>
        </QuestionDetails>
        <Timestamp date={date} />
        <QuestionDetails>|</QuestionDetails>
        <QuestionDetails>views: {round(views)}</QuestionDetails>
      </div>
    );
  };
}

QuestionMeta.propTypes = {
  date: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired
};

export default QuestionMeta;
