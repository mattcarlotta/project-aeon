import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Affix from "~components/Body/Affix";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import CommentsContainer from "~components/Body/CommentsContainer";
import Container from "~components/Body/Container";
import FlexCenter from "~components/Body/FlexCenter";
import LoadingItem from "~components/Body/LoadingItem";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import QuestionContainer from "~components/Body/QuestionContainer";
import NoSSR from "~components/Body/NoSSR";
import Preview from "~components/Body/Preview";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import Voter from "~components/Body/Voter";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import Comment from "~containers/Body/Comment";
import PostMeta from "~containers/Body/PostMeta";
import CommentForm from "~containers/Forms/CommentForm";

class QuestionReview extends Component {
  constructor(props) {
    super(props);

    const { answers, comments, question } = props;

    this.state = {
      answers,
      comments,
      question,
      addComment: false,
      isEditing: false
    };
  }

  handleUpdatedQuestion = data => {
    this.setState(prevState => ({
      question: { ...prevState.question, ...data }
    }));
  };

  // handleCommentSubmission = data => this.setState({ ...data })

  toggleCommentForm = () =>
    this.setState(prevState => ({ addComment: !prevState.addComment }));

  render = () => {
    const {
      addComment,
      comments,
      question: { body, description, id, tags, title, uniquetitle },
      isEditing
    } = this.state;

    const questionHasComments = !isEmpty(comments);
    const questionComments = questionHasComments
      ? comments.filter(c => c.rid !== id)
      : [];

    return (
      <>
        <Head
          description={description}
          keywords={tags.join()}
          title={`Question - '${title}'`}
          url={`q/${id}/${uniquetitle}`}
          type="question"
        />
        <Container centered maxWidth="750px" padding="0px">
          <div css="padding-left: 45px;">
            <FlexCenter
              direction="column"
              height="120px"
              width="45px"
              style={{
                top: 0,
                left: 0,
                position: "absolute"
              }}
            >
              <Voter
                {...this.state.question}
                handleChange={this.handleUpdatedQuestion}
              />
            </FlexCenter>
            <QuestionContainer>
              <PostMeta {...this.state.question} />
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
              {!isEditing && (
                <>
                  <Fade in={!addComment} timeout={{ enter: 1500, leave: 100 }}>
                    <Center>
                      <Button
                        plain
                        width="140px"
                        onClick={this.toggleCommentForm}
                      >
                        Add comment
                      </Button>
                    </Center>
                  </Fade>
                  <Collapse in={addComment}>
                    <CommentForm
                      cancelComment={this.toggleCommentForm}
                      qid={id}
                      updateQuestion={this.handleUpdatedQuestion}
                      rid={id}
                    />
                  </Collapse>
                </>
              )}
            </QuestionContainer>
          </div>
          {questionHasComments && !isEmpty(questionComments) && (
            <CommentsContainer>
              {questionComments.map(comment => (
                <Comment key={comment.id} {...comment} />
              ))}
            </CommentsContainer>
          )}
        </Container>
      </>
    );
  };
}

QuestionReview.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      uid: PropTypes.string,
      qid: PropTypes.string,
      date: PropTypes.string,
      body: PropTypes.string,
      votes: PropTypes.number
    })
  ),
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
  question: PropTypes.shape({
    answered: PropTypes.bool,
    body: PropTypes.string.isRequired,
    commentcount: PropTypes.number,
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

export default QuestionReview;
