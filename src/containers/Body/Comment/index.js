import { Component } from "react";
import { FaEraser, FaFlag, FaPencilAlt, FaShareAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import PostMeta from "~containers/Body/PostMeta";
import Voter from "~components/Body/Voter";
import CommentForm from "~containers/Forms/CommentForm";

const btnProps = {
  plain: true,
  fontSize: "12px",
  padding: "4px",
  margin: "0 2px 0",
  radius: "4px",
  width: "auto"
};

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      isEditing: false
    };
  }

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
    const { id, body, isEditing, qid, rid, uid } = this.state;
    const { loggedInUserId, isEditingComment } = this.props;

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
              <PostMeta showPoints {...this.state} />
              <Preview style={{ marginBottom: 0, padding: "10px 5px" }}>
                <MarkdownPreviewer>{body}</MarkdownPreviewer>
              </Preview>
              <Flex justify="left">
                {loggedInUserId === uid && !isEditingComment && (
                  <Button {...btnProps} onClick={this.toggleEditingComment}>
                    <FaPencilAlt
                      style={{
                        position: "relative",
                        top: 1,
                        marginRight: 5,
                        fontSize: 12
                      }}
                    />
                    Edit
                  </Button>
                )}
                {loggedInUserId === uid && !isEditingComment && (
                  <Button {...btnProps} onClick={this.handleDeleteComment}>
                    <FaEraser
                      style={{
                        position: "relative",
                        top: 1,
                        marginRight: 5,
                        fontSize: 12
                      }}
                    />
                    Delete
                  </Button>
                )}
                <Button {...btnProps}>
                  <FaShareAlt
                    style={{
                      position: "relative",
                      top: 1,
                      marginRight: 5,
                      fontSize: 12
                    }}
                  />
                  Share
                </Button>
                <Button {...btnProps}>
                  <FaFlag
                    style={{
                      position: "relative",
                      top: 1,
                      marginRight: 5,
                      fontSize: 12
                    }}
                  />
                  Report
                </Button>
              </Flex>
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
