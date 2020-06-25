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
          direction="column"
          height="65px"
          width="45px"
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            background: "#f7f7f7"
          }}
        >
          <Voter
            {...this.state}
            hideVote
            handleChange={this.handleUpdatedComment}
            URL="c"
          />
        </FlexCenter>
        <div css="padding: 15px 20px 10px 5px;">
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