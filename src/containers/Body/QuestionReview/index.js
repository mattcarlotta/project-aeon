import { Component } from "react";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Affix from "~components/Body/Affix";
import Button from "~components/Body/Button";
import Container from "~components/Body/Container";
import Center from "~components/Body/Center";
import FlexCenter from "~components/Body/FlexCenter";
import LoadingItem from "~components/Body/LoadingItem";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import QuestionContainer from "~components/Body/QuestionContainer";
import NoSSR from "~components/Body/NoSSR";
import Preview from "~components/Body/Preview";
import QuestionDetails from "~components/Body/QuestionDetails";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import Tooltip from "~components/Body/Tooltip";
import Voter from "~components/Body/Voter";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import CommentForm from "~containers/Forms/CommentForm";
import dayjs from "~utils/dayjs";

class QuestionReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      addComment: false,
      isEditing: false,
    };
  }

  handleUpdatedQuestion = data => this.setState({ ...data });

  toggleCommentForm = () =>
    this.setState(prevState => ({ addComment: !prevState.addComment }));

  render = () => {
    const {
      addComment,
      body,
      date,
      isEditing,
      questionKey,
      tags,
      title,
      username,
      views,
    } = this.state;

    return (
      <>
        <Head title={`Question - '${title}'`} />
        <Container centered maxWidth="750px" padding="0px">
          <div css="padding-left: 45px;">
            <FlexCenter
              direction="column"
              height="120px"
              width="45px"
              style={{
                top: 0,
                left: 0,
                position: "absolute",
              }}
            >
              <Voter
                {...this.state}
                updateQuestion={this.handleUpdatedQuestion}
              />
            </FlexCenter>
            <QuestionContainer>
              <div css="font-size: 12px;color: #787C7E;">
                <QuestionDetails>
                  Posted by&nbsp;
                  <Link
                    blue
                    nomargin
                    href="/u/[...slug]"
                    asHref={`/u/${questionKey}/${username}`}
                  >
                    {username}
                  </Link>
                </QuestionDetails>
                <Tooltip title={dayjs(date).format("MMMM Do, YYYY @ HH:MMa")}>
                  <QuestionDetails>{dayjs(date).fromNow()}</QuestionDetails>
                </Tooltip>
                <QuestionDetails>|</QuestionDetails>
                <QuestionDetails>views: {views}</QuestionDetails>
              </div>
              <NoSSR fallback={<LoadingItem />}>
                <Affix
                  {...this.state}
                  updateQuestion={this.handleUpdatedQuestion}
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
                      questionKey={questionKey}
                      cancelComment={this.toggleCommentForm}
                    />
                  </Collapse>
                </>
              )}
            </QuestionContainer>
          </div>
        </Container>
      </>
    );
  };
}

QuestionReview.propTypes = {
  answered: PropTypes.bool,
  body: PropTypes.string,
  comments: PropTypes.number,
  date: PropTypes.string,
  downvoted: PropTypes.bool,
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  upvoted: PropTypes.bool,
  userkey: PropTypes.number,
  username: PropTypes.string,
  views: PropTypes.number,
  votes: PropTypes.number,
};

export default QuestionReview;
