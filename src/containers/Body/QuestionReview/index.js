import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import Router from "next/router";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Affix from "~components/Body/Affix";
import Button from "~components/Body/Button";
import CommentsContainer from "~components/Body/CommentsContainer";
import Container from "~components/Body/Container";
import Comment from "~containers/Body/Comment";
import DeletedMessage from "~components/Body/DeletedMessage";
import FlexCenter from "~components/Body/FlexCenter";
import LoadingItem from "~components/Body/LoadingItem";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import QCButtons from "~components/Body/QCButtons";
import QuestionContainer from "~components/Body/QuestionContainer";
import NoSSR from "~components/Body/NoSSR";
import PostMeta from "~containers/Body/PostMeta";
import Preview from "~components/Body/Preview";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tags from "~components/Body/Tags";
import Voter from "~components/Body/Voter";
import Head from "~components/Navigation/Head";
import CommentForm from "~containers/Forms/CommentForm";
import QuestionForm from "~containers/Forms/QuestionForm";
import AnswerForm from "~containers/Forms/AnswerForm";

class QuestionReview extends Component {
  constructor(props) {
    super(props);

    const { question } = props; // answers

    this.state = {
      // answers,
      question,
      addComment: false,
      collapseComments: false,
      isEditingComment: "",
      isEditingQuestion: false,
      isCommenting: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleScroll = id => {
    this.timer = setTimeout(() => {
      const el = document.getElementById(id);

      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  handleAddComment = data =>
    this.setState(
      prevState => ({
        addComment: false,
        collapseComments: false,
        isCommenting: false,
        isEditingComment: "",
        isEditingQuestion: false,
        question: {
          ...prevState.question,
          comments: [...prevState.question.comments, data]
        }
      }),
      () => this.handleScroll(`comment-${data.id}`)
    );

  handleCommentEditing = id =>
    this.setState(
      prevState => ({
        addComment: false,
        isCommenting: false,
        isEditingComment: prevState.isEditingComment === id ? "" : id,
        isEditingQuestion: false
      }),
      () => {
        if (id) this.handleScroll(`comment-${id}`);
      }
    );

  handleDeleteComment = ({ comment: { id } }) =>
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        comments: prevState.question.comments.filter(c => c.id !== id)
      }
    }));

  handleUpdate = data => {
    this.setState(prevState => ({
      isEditingQuestion: false,
      question: { ...prevState.question, ...data }
    }));
  };

  handleQuestionStatus = ({ question }) => this.handleUpdate(question);

  handleUpdatedQuestion = data => {
    const {
      question: { id }
    } = this.props;
    const { uniquetitle } = this.state;

    if (data.uniquetitle !== uniquetitle)
      Router.replace("/q/[...slug]", `/q/${id}/${data.uniquetitle}`, {
        shallow: true
      });

    this.handleUpdate(data);
  };

  toggleComments = () =>
    this.setState(
      prevState => ({
        collapseComments: !prevState.collapseComments,
        isEditingComment: "",
        isEditingQuestion: false
      }),
      () => {
        if (!this.state.collapseComments) this.handleScroll("comments-anchor");
      }
    );

  toggleCommentForm = () =>
    this.setState(
      prevState => ({
        addComment: !prevState.addComment,
        isCommenting: !prevState.isCommenting,
        isEditingComment: "",
        isEditingQuestion: false
      }),
      () => {
        if (this.state.addComment)
          this.handleScroll(`${this.state.question.id}-new-comment`);
      }
    );

  toggleQuestionForm = () =>
    this.setState(
      prevState => ({
        addComment: false,
        isCommenting: false,
        isEditingComment: "",
        isEditingQuestion: !prevState.isEditingQuestion
      }),
      () => {
        if (this.state.isEditingQuestion)
          this.handleScroll(`${this.state.question.id}-edit-question`);
      }
    );

  render = () => {
    const {
      addComment,
      collapseComments,
      question,
      isEditingComment,
      isEditingQuestion,
      isCommenting
    } = this.state;
    const {
      body,
      comments,
      deleted,
      description,
      id,
      tags,
      title,
      uid,
      uniquetitle
    } = question;

    const { loggedInUserId } = this.props;
    const hasComments = !isEmpty(comments);

    return (
      <>
        <Head
          description={description}
          keywords={tags.join()}
          title={`Question - '${title}'`}
          url={`q/${id}/${uniquetitle}`}
          type="question"
        />
        <Container centered deleted={deleted} maxWidth="750px" padding="0px">
          <div css="padding-left: 45px;">
            <FlexCenter floating direction="column" height="120px" width="45px">
              <Voter {...question} handleChange={this.handleUpdate} />
            </FlexCenter>
            <QuestionContainer>
              <PostMeta {...question} showViews />
              {isEditingQuestion ? (
                <div css="margin: 10px 0;padding: 10px 0;">
                  <QuestionForm
                    id={id}
                    formId={`${id}-edit-question`}
                    alertType="info"
                    body={body}
                    tags={tags}
                    title={title}
                    cancelQuestion={this.toggleQuestionForm}
                    handleSubmit={this.handleUpdatedQuestion}
                    URL="q/update"
                  />
                </div>
              ) : (
                <>
                  <NoSSR
                    fallback={
                      <LoadingItem height="35px" margin="10px 0 14px" />
                    }
                  >
                    <Affix {...question} handleChange={this.handleUpdate}>
                      <QuestionTitle>{title}</QuestionTitle>
                    </Affix>
                  </NoSSR>
                  <Tags tags={tags} />
                  <Preview>
                    <MarkdownPreviewer>{body}</MarkdownPreviewer>
                  </Preview>
                  <div css="margin-bottom: 10px;">
                    <QCButtons
                      comments={comments.length}
                      deleted={deleted}
                      collapseComments={collapseComments}
                      hasComments={hasComments}
                      handleEdit={this.toggleQuestionForm}
                      handleStatusUpdate={this.handleQuestionStatus}
                      handleShare={() => {}}
                      handleReport={() => {}}
                      id={id}
                      isAuthor={loggedInUserId === uid}
                      isEditing={isEditingComment}
                      toggleComments={this.toggleComments}
                      type="q"
                    />
                  </div>
                  {!deleted && (
                    <AnswerForm
                      alertType="success"
                      formId={`${id}-new-answer`}
                      handleSubmit={() => {}}
                      id={id}
                      URL="a"
                    />
                  )}
                  {deleted && <DeletedMessage />}
                </>
              )}
            </QuestionContainer>
          </div>
          {hasComments && !deleted && (
            <>
              <span id="comments-anchor" />
              <Collapse in={!collapseComments}>
                <CommentsContainer>
                  {comments.map(comment => (
                    <Comment
                      {...comment}
                      key={comment.id}
                      deleteComment={this.handleDeleteComment}
                      isEditingComment={isEditingComment}
                      loggedInUserId={loggedInUserId}
                      toggleCommentEditing={this.handleCommentEditing}
                    />
                  ))}
                </CommentsContainer>
              </Collapse>
            </>
          )}
          {!deleted && !isEditingComment && loggedInUserId && (
            <>
              <div css="margin: 0;height: 1px;background: linear-gradient(to right,white 1%,#d7e0e8 8%,#d7e0e8 90%,white 100%);" />
              <div
                css={`
                  padding: 10px;
                  background: ${collapseComments || !hasComments
                    ? "#fff"
                    : "#f9f9f9"};
                `}
              >
                <Fade
                  style={{ display: isCommenting ? "none" : "block" }}
                  in={!addComment}
                  timeout={{ enter: 1500, leave: 100 }}
                >
                  <span>
                    <Button input radius="4px" onClick={this.toggleCommentForm}>
                      Add comment
                    </Button>
                  </span>
                </Fade>
                <Collapse in={isCommenting}>
                  <CommentForm
                    formId={`${id}-new-comment`}
                    cancelComment={this.toggleCommentForm}
                    isCommenting={isCommenting}
                    qid={id}
                    handleSubmit={this.handleAddComment}
                    rid={id}
                    URL="c/create"
                  />
                </Collapse>
              </div>
            </>
          )}
        </Container>
      </>
    );
  };
}

QuestionReview.propTypes = {
  // answers: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     comments: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         id: PropTypes.string,
  //         qid: PropTypes.number,
  //         uid: PropTypes.string,
  //         date: PropTypes.string,
  //         updated: PropTypes.string,
  //         rid: PropTypes.string,
  //         body: PropTypes.string,
  //         upvoted: PropTypes.bool,
  //         downvoted: PropTypes.bool,
  //         votes: PropTypes.number
  //       })
  //     ),
  //     uid: PropTypes.string,
  //     qid: PropTypes.string,
  //     date: PropTypes.string,
  //     updated: PropTypes.string,
  //     body: PropTypes.string,
  //     votes: PropTypes.number
  //   })
  // ),
  loggedInUserId: PropTypes.string,
  question: PropTypes.shape({
    answered: PropTypes.bool,
    body: PropTypes.string.isRequired,
    commentcount: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        uid: PropTypes.string,
        qid: PropTypes.number,
        rid: PropTypes.string,
        date: PropTypes.string,
        updated: PropTypes.string,
        body: PropTypes.string,
        upvoted: PropTypes.bool,
        downvoted: PropTypes.bool,
        username: PropTypes.string,
        votes: PropTypes.number
      })
    ),
    date: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    downvoted: PropTypes.bool,
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    updated: PropTypes.string,
    upvoted: PropTypes.bool,
    uniquetitle: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    views: PropTypes.number,
    votes: PropTypes.number
  })
};

const mapStateToProps = ({ authentication }) => ({
  loggedInUserId: authentication.id
});

export default connect(mapStateToProps)(QuestionReview);
