import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Affix from "~components/Body/Affix";
import Button from "~components/Body/Button";
import CommentsContainer from "~components/Body/CommentsContainer";
import Container from "~components/Body/Container";
import Comment from "~containers/Body/Comment";
import FlexCenter from "~components/Body/FlexCenter";
import LoadingItem from "~components/Body/LoadingItem";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import QuestionContainer from "~components/Body/QuestionContainer";
import NoSSR from "~components/Body/NoSSR";
import PostMeta from "~containers/Body/PostMeta";
import Preview from "~components/Body/Preview";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import toast from "~components/Body/Toast";
import Voter from "~components/Body/Voter";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import CommentForm from "~containers/Forms/CommentForm";
import app from "~utils/axiosConfig";
import { parseMessage } from "~utils/parse";

class QuestionReview extends Component {
  constructor(props) {
    super(props);

    const { question } = props; // answers

    this.state = {
      // answers,
      question,
      addComment: false,
      collapseComments: false,
      isEditingComment: false,
      isCommenting: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleScroll = id => {
    this.timer = setTimeout(() => {
      const element = document.getElementById(id);

      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop + 80 : 0
      });
    }, 200);
  };

  handleCommentEditing = () =>
    this.setState(
      prevState => ({
        addComment: false,
        isCommenting: false,
        isEditingComment: !prevState.isEditingComment
      }),
      () => {
        if (this.state.isEditingComment) this.handleScroll("comment-form");
      }
    );

  handleUpdatedQuestion = data => {
    this.setState(prevState => ({
      question: { ...prevState.question, ...data }
    }));
  };

  handleAddComment = data =>
    this.setState(prevState => ({
      addComment: false,
      collapseComments: false,
      isCommenting: false,
      isEditingComment: false,
      question: {
        ...prevState.question,
        comments: [...prevState.question.comments, data]
      }
    }));

  handleRemoveComment = id =>
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        comments: prevState.question.comments.filter(c => c.id !== id)
      }
    }));

  handleDeleteComment = async id => {
    try {
      const res = await app.delete(`c/delete/${id}`);
      const message = parseMessage(res);

      toast({ type: "info", message });

      if (this.containerRef) this.handleRemoveComment(id);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  };

  toggleComments = () =>
    this.setState(
      prevState => ({
        collapseComments: !prevState.collapseComments,
        isEditingComment: false
      }),
      () => {
        if (!this.state.collapseComments) this.handleScroll("comments");
      }
    );

  toggleCommentForm = () =>
    this.setState(
      prevState => ({
        addComment: !prevState.addComment,
        isEditingComment: false,
        isCommenting: !prevState.isCommenting
      }),
      () => {
        if (this.state.addComment) this.handleScroll("comment-form");
      }
    );

  render = () => {
    const {
      addComment,
      collapseComments,
      question: { body, comments, description, id, tags, title, uniquetitle },
      isEditingComment,
      isCommenting
    } = this.state;

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
        <Container
          ref={node => (this.containerRef = node)}
          centered
          maxWidth="750px"
          padding="0px"
        >
          <div css="padding-left: 45px;">
            <FlexCenter floating direction="column" height="120px" width="45px">
              <Voter
                {...this.state.question}
                handleChange={this.handleUpdatedQuestion}
              />
            </FlexCenter>
            <QuestionContainer>
              <PostMeta {...this.state.question} showViews />
              <NoSSR fallback={<LoadingItem />}>
                <Affix
                  {...this.state.question}
                  handleChange={this.handleUpdatedQuestion}
                >
                  <QuestionTitle>{title}</QuestionTitle>
                </Affix>
              </NoSSR>
              <div css="margin-bottom: 15px;">
                {tags.map(tag => (
                  <Link
                    key={tag}
                    margin="0 5px 0 0"
                    href="/t/[...slug]"
                    asHref={`/t/${tag}`}
                  >
                    <Tag>{tag}</Tag>
                  </Link>
                ))}
              </div>
              <Preview>
                <MarkdownPreviewer>{body}</MarkdownPreviewer>
              </Preview>
              <div css="height: 25px;width: 100%;background: #bbb;margin-bottom: 25px;" />
              {hasComments && !isEditingComment && (
                <Button
                  plain
                  centered
                  width="160px"
                  onClick={this.toggleComments}
                >
                  {collapseComments ? "Show Comments" : "Hide Comments"}
                </Button>
              )}
            </QuestionContainer>
          </div>
          {hasComments && (
            <Collapse in={!collapseComments}>
              <CommentsContainer id="comments">
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
          )}
          <div
            css={`
              padding: 5px 10px 10px 10px;
              background: ${collapseComments || !hasComments
                ? "#fff"
                : "#f9f9f9"};
            `}
          >
            {!isEditingComment && (
              <>
                <Fade in={!addComment} timeout={{ enter: 1500, leave: 100 }}>
                  <span>
                    <Button input onClick={this.toggleCommentForm}>
                      Reply
                    </Button>
                  </span>
                </Fade>
                <Collapse in={isCommenting}>
                  <CommentForm
                    cancelComment={this.toggleCommentForm}
                    isCommenting={isCommenting}
                    qid={id}
                    handleChange={this.handleAddComment}
                    rid={id}
                    URL="c/create"
                  />
                </Collapse>
              </>
            )}
          </div>
        </Container>
      </>
    );
  };
}

QuestionReview.propTypes = {
  // answers: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     uid: PropTypes.string,
  //     qid: PropTypes.string,
  //     date: PropTypes.string,
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
        body: PropTypes.string,
        upvoted: PropTypes.bool,
        downvoted: PropTypes.bool,
        username: PropTypes.string,
        votes: PropTypes.number
      })
    ),
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    downvoted: PropTypes.bool,
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
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
