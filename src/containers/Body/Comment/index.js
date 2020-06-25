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
    return (
      <div css="display: flex; flex-direction: row;height: 100%;">
        <FlexCenter direction="column" height="100%" width="45px">
          <div css="display: flex;z-index: 1;background-color: #F9F9F9; flex-direction: column;padding: 7px 0;">
            <Voter
              {...this.state}
              hideVote
              handleChange={this.handleUpdatedComment}
              URL="c"
            />
          </div>
          <div css="bottom: 0;top: 0px;height:95%;position: absolute;display: inline-block;vertical-align: top;width: 2px;background: #d7e0e8;z-index: 0;" />
        </FlexCenter>
        <div css="display: flex; flex-direction:column;padding: 8px 12px 12px 3px;width:710px;">
          <PostMeta showPoints {...this.state} />
          <Preview>
            <MarkdownPreviewer>{this.state.body}</MarkdownPreviewer>
          </Preview>
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
