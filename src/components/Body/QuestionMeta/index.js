import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Grow from "@material-ui/core/Grow";
import FadeIn from "~components/Body/FadeIn";
import MaskPreview from "~components/Body/MaskPreview";
import LoadingItem from "~components/Body/LoadingItem";
import QuestionDetails from "~components/Body/QuestionDetails";
import Timestamp from "~components/Body/Timestamp";
import toast from "~components/Body/Toast";
import Website from "~components/Body/Website";
import Link from "~components/Navigation/Link";
import DefaultAvatar from "~images/defaultAvatar.png";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
import round from "~utils/round";
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
            <Grow in={isHovered && !error} timeout={{ enter: 500, leave: 100 }}>
              <UserDropdown>
                {!isEmpty(user) ? (
                  <div css="padding: 12px;">
                    <div css="display: flex;align-items: center;">
                      <img
                        css="max-height: 55px;max-width:55px;display: block;margin-right: 10px;"
                        src={user.avatar || DefaultAvatar}
                        alt="avatar.png"
                      />
                      <div css="display: flex;flex-direction: column;align-items: flex-start;">
                        <Link
                          blue
                          nomargin
                          stopPropagation
                          href="/u/[...slug]"
                          asHref={`/u/${username}`}
                        >
                          <div css="font-size: 16px;">
                            u&#47;{user.username}
                          </div>
                        </Link>
                        <div css="color: #1c1c1c;">
                          <span css="color: #39c7ff;margin-right: 5px;font-size: 13px;">
                            &#9733;
                          </span>
                          {round(user.reputation)} rep
                        </div>
                        {user.website && <Website href={user.website} />}
                      </div>
                    </div>
                    {user.description && (
                      <MaskPreview maxHeight={80} maskHeight={35}>
                        {user.description}
                      </MaskPreview>
                    )}
                  </div>
                ) : isHovered ? (
                  <FadeIn>
                    <div css="padding: 12px;">
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
                    </div>
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
