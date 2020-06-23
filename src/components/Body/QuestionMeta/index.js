import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Grow from "@material-ui/core/Grow";
import FadeIn from "~components/Body/FadeIn";
import Flex from "~components/Body/Flex";
import MaskPreview from "~components/Body/MaskPreview";
import LoadingItem from "~components/Body/LoadingItem";
import QuestionDetails from "~components/Body/QuestionDetails";
import Timestamp from "~components/Body/Timestamp";
import UserRep from "~components/Body/UserRep";
import toast from "~components/Body/Toast";
import Website from "~components/Body/Website";
import Link from "~components/Navigation/Link";
import DefaultAvatar from "~images/defaultAvatar.png";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
import round from "~utils/round";
import UserContainer from "./UserContainer";
import UserDropdown from "./UserDropdown";

const initialState = {
  user: {},
  error: "",
  isHovered: false,
};

class QuestionMeta extends Component {
  state = initialState;

  componentDidMount() {
    this.isActive = true;
  }

  componentWillUnmount() {
    this.clearTimer();
    this.isActive = false;
  }

  clearTimer = () => {
    clearTimeout(this.timer);
    if (this.isActive && this.state.isHovered) this.setState(initialState);
  };

  setTimer = () => (this.timer = setTimeout(this.showUserDetails, 750));

  showUserDetails = () =>
    this.setState({ isHovered: true }, async () => {
      if (isEmpty(this.state.user)) {
        try {
          const res = await app.get(`/u/${this.props.username}`);
          const data = parseData(res);

          if (this.isActive && this.state.isHovered)
            this.setState({ user: data, error: "" });
        } catch (err) {
          this.setState({ error: err.toString() }, () =>
            toast({ type: "error", message: err.toString() }),
          );
        }
      }
    });

  render = () => {
    const { error, isHovered, user } = this.state;
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
              in={isHovered && !error}
              style={{
                transformOrigin: "0 0 0",
                zIndex: !isHovered ? "-1" : "100",
                opacity: !isHovered ? 0 : 1,
              }}
              timeout={{ enter: 500, leave: 100 }}
            >
              <UserDropdown>
                {!isEmpty(user) ? (
                  <UserContainer>
                    <Flex justify="left">
                      <img
                        css="max-height: 55px;max-width:55px;display: block;margin-right: 10px;"
                        src={user.avatar || DefaultAvatar}
                        alt="avatar.png"
                      />
                      <div css="display: flex;flex-direction: column;align-items: flex-start;overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap;">
                        <Link
                          blue
                          margin="2px 0"
                          stopPropagation
                          href="/u/[...slug]"
                          asHref={`/u/${username}`}
                        >
                          <div css="font-size: 16px;">{user.username}</div>
                        </Link>
                        {user.website && <Website href={user.website} />}
                        <UserRep reputation={user.reputation} />
                      </div>
                    </Flex>
                    {user.description && (
                      <MaskPreview maxHeight={80} maskHeight={35}>
                        {user.description}
                      </MaskPreview>
                    )}
                  </UserContainer>
                ) : isHovered ? (
                  <FadeIn>
                    <UserContainer>
                      <div css="display: flex;align-items: center;">
                        <LoadingItem
                          height="55px"
                          margin="0 10px 0 0"
                          width="55px"
                        />
                        <div css="display: flex;flex-direction: column;align-items: flex-start;">
                          <LoadingItem
                            height="20px"
                            margin="0 0 5px 0"
                            width="208px"
                          />
                          <LoadingItem
                            height="15px"
                            margin="0 0 5px 0"
                            width="208px"
                          />
                          <LoadingItem height="10px" margin="0" width="208px" />
                        </div>
                      </div>
                      <LoadingItem
                        height="73px"
                        margin="5px 0 0 0"
                        width="273px"
                      />
                    </UserContainer>
                  </FadeIn>
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
  views: PropTypes.number.isRequired,
};

export default QuestionMeta;
