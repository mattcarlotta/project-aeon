import { Component } from "react";
import PropTypes from "prop-types";
import FlexCenter from "~components/Body/FlexCenter";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import QCButtons from "~components/Body/QCButtons";
import Voter from "~components/Body/Voter";
import PostMeta from "~containers/Body/PostMeta";
import CommentForm from "~containers/Forms/CommentForm";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  shouldComponentUpdate = (prevProps, prevState) =>
    prevProps.isEditingComment !== this.props.isEditingComment ||
    prevProps.loggedInUserId !== this.props.loggedInUserId ||
    prevState.downvoted !== this.state.downvoted ||
    prevState.upvoted !== this.state.upvoted ||
    prevState.votes !== this.state.votes ||
    prevState.body !== this.state.body ||
    prevState.isEditing !== this.state.isEditing;

  handleToggleCommentEditing = id => this.props.toggleCommentEditing(id);

  handleUpdatedComment = data =>
    this.setState(
      prevState => ({ ...prevState, ...data }),
      () => {
        if (this.props.isEditingComment) this.handleToggleCommentEditing("");
      }
    );

  toggleEditingComment = () => this.handleToggleCommentEditing(this.props.id);

  render = () => {
    const { id, body, qid, rid, uid } = this.state;
    const { deleteComment, isEditingComment } = this.props;

    const isEditing = isEditingComment === id;

    return (
      <div id={`comment-${id}`} css="padding-left: 45px;position: relative;">
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
        <div css="padding: 15px 20px 5px 5px;">
          <PostMeta showPoints {...this.state} />
          {isEditing ? (
            <CommentForm
              formId={`edit-comment-${id}`}
              isCommenting
              cancelComment={this.toggleEditingComment}
              handleSubmit={this.handleUpdatedComment}
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
                isAuthor={this.props.loggedInUserId === uid}
                handleEdit={this.toggleEditingComment}
                handleReport={() => {}}
                handleShare={() => {}}
                handleStatusUpdate={deleteComment}
                isEditing={isEditing}
                type="c"
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
  isEditingComment: PropTypes.string,
  loggedInUserId: PropTypes.string,
  toggleCommentEditing: PropTypes.func.isRequired,
  votes: PropTypes.number
};

export default Comment;
