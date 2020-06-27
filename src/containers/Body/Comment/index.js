import { Component } from "react";
import PropTypes from "prop-types";
import FlexCenter from "~components/Body/FlexCenter";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import PostMeta from "~containers/Body/PostMeta";
import Voter from "~components/Body/Voter";
import CommentForm from "~containers/Forms/CommentForm";
import QCButtons from "~components/Body/QCButtons";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      isEditing: false
    };
  }

  shouldComponentUpdate = (prevProps, prevState) =>
    prevProps.isEditingComment !== this.props.isEditingComment ||
    prevState.downvoted !== this.state.downvoted ||
    prevState.upvoted !== this.state.upvoted ||
    prevState.votes !== this.state.votes ||
    prevState.body !== this.state.body ||
    prevState.isEditing !== this.state.isEditing;

  handleToggleCommentEditing = () => this.props.toggleCommentEditing();

  handleDeleteComment = () => this.props.deleteComment(this.props.id);

  handleUpdatedComment = data =>
    this.setState(
      prevState => ({ ...prevState, ...data, isEditing: false }),
      () => {
        if (this.props.isEditingComment) this.handleToggleCommentEditing();
      }
    );

  toggleEditingComment = () =>
    this.setState(
      prevState => ({ isEditing: !prevState.isEditing }),
      () => this.handleToggleCommentEditing()
    );

  render = () => {
    const { id, body, isEditing, qid, rid } = this.state;

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
          {isEditing ? (
            <CommentForm
              isCommenting
              cancelComment={this.toggleEditingComment}
              handleChange={this.handleUpdatedComment}
              id={id}
              qid={qid}
              rid={rid}
              value={body}
              URL="c/update"
            />
          ) : (
            <>
              <Preview style={{ marginBottom: 0, padding: "10px 5px" }}>
                <MarkdownPreviewer>{body}</MarkdownPreviewer>
              </Preview>
              <QCButtons
                {...this.state}
                handleEdit={this.toggleEditingComment}
                handleDelete={this.handleDeleteComment}
                handleReport={() => {}}
                handleShare={() => {}}
              />
            </>
          )}
        </div>
      </div>
    );
  };
}

Comment.propTypes = {
  id: PropTypes.string,
  uid: PropTypes.string,
  date: PropTypes.string,
  deleteComment: PropTypes.func.isRequired,
  rid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  body: PropTypes.string,
  upvoted: PropTypes.bool,
  downvoted: PropTypes.bool,
  username: PropTypes.string,
  isEditingComment: PropTypes.bool,
  loggedInUserId: PropTypes.string,
  toggleCommentEditing: PropTypes.func.isRequired,
  votes: PropTypes.number
};

export default Comment;
