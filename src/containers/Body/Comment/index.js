import { Component } from "react";
import PropTypes from "prop-types";
import FlexCenter from "~components/Body/FlexCenter";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import PostMeta from "~containers/Body/PostMeta";
import Voter from "~components/Body/Voter";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  handleUpdatedComment = data =>
    this.setState(prevState => ({ ...prevState, ...data }));

  render = () => {
    const { body } = this.state;

    return (
      <div css="padding-left: 45px;position: relative;">
        <FlexCenter
          floating
          direction="column"
          height="65px"
          width="42px"
          style={{ background: "#f7f7f7" }}
        >
          <Voter
            {...this.state}
            hideVote
            handleChange={this.handleUpdatedComment}
            URL="c"
          />
        </FlexCenter>
        <div css="padding: 14px 20px 5px 5px;">
          <PostMeta showPoints {...this.state} />
          <Preview>
            <MarkdownPreviewer>{body}</MarkdownPreviewer>
          </Preview>
          <div css="height: 25px;width: 100%;background: #bbb;" />
        </div>
      </div>
    );
  };
}

Comment.propTypes = {
  id: PropTypes.string,
  uid: PropTypes.string,
  date: PropTypes.string,
  rid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  body: PropTypes.string,
  upvoted: PropTypes.bool,
  downvoted: PropTypes.bool,
  username: PropTypes.string,
  votes: PropTypes.number
};

export default Comment;
