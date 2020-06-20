import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import { resetMessages } from "~actions/Messages";
import Affix from "~components/Body/Affix";
import Button from "~components/Body/Button";
import Container from "~components/Body/Container";
import Center from "~components/Body/Center";
import FlexCenter from "~components/Body/FlexCenter";
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
import withServerMessages from "~containers/App/withServerMessages";
import CreateComment from "~containers/Forms/CreateComment";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import dayjs from "~utils/dayjs";
import { parseData, parseCookie } from "~utils/parseResponse";

class UserQuestion extends Component {
  state = {
    ...this.props,
    addComment: false,
  };

  toggleCommentForm = () =>
    this.setState(prevState => ({ addComment: !prevState.addComment }));

  render = () => {
    const { addComment, data, title } = this.state;

    return (
      <>
        <Head title={`Questions - ${title || "Not Found"}`} />
        {isEmpty(data) ? (
          <div>No Questions</div>
        ) : (
          <Container centered maxWidth="750px" padding="0px">
            <div css="padding-left: 45px;">
              <FlexCenter
                direction="column"
                height="110px"
                width="45px"
                style={{
                  top: 0,
                  left: 0,
                  position: "absolute",
                  paddingLeft: "7px",
                }}
              >
                <Voter
                  downVote={() => {}}
                  upVote={() => {}}
                  votes={data.votes}
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
                      asHref={`/u/${data.key}/${data.username}`}
                    >
                      {data.username}
                    </Link>
                  </QuestionDetails>
                  <Tooltip
                    title={dayjs(data.date).format("MMMM Do, YYYY @ HH:MMa")}
                  >
                    <QuestionDetails>
                      {dayjs(data.date).fromNow()}
                    </QuestionDetails>
                  </Tooltip>
                  <QuestionDetails>|</QuestionDetails>
                  <QuestionDetails>views: {data.views}</QuestionDetails>
                </div>
                <NoSSR>
                  <Affix {...data} downVote={() => {}} upVote={() => {}}>
                    <QuestionTitle>{data.title}</QuestionTitle>
                  </Affix>
                </NoSSR>
                <div css="margin-bottom: 15px;">
                  {data.tags.map(tag => (
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
                  <MarkdownPreviewer>{data.body}</MarkdownPreviewer>
                </Preview>
                <div css="height: 25px;width: 100%;background: #bbb;margin-bottom: 25px;" />
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
                  <CreateComment
                    questionKey={data.key}
                    cancelComment={this.toggleCommentForm}
                  />
                </Collapse>
              </QuestionContainer>
            </div>
          </Container>
        )}
      </>
    );
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store: { dispatch }, query }) => {
    let data = {};
    let title = "";
    let serverError = "";
    try {
      const { 0: key } = query.slug;
      dispatch(resetMessages());
      const res = await app.get(`q/${key}`, parseCookie(req));
      data = parseData(res);
      title = data.title;
    } catch (e) {
      serverError = e.toString();
    }

    return {
      props: {
        data,
        serverError,
        title,
        query,
        redirect: true,
      },
    };
  },
);

UserQuestion.propTypes = {
  data: PropTypes.shape({
    answered: PropTypes.bool,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        userid: PropTypes.string,
        comment: PropTypes.string,
        accepted: PropTypes.bool,
        points: PropTypes.number,
      }),
    ),
    date: PropTypes.string,
    key: PropTypes.number,
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    views: PropTypes.number,
    votes: PropTypes.number,
    userkey: PropTypes.number,
    userid: PropTypes.string,
    username: PropTypes.string,
    userrep: PropTypes.number,
  }),
  title: PropTypes.string.isRequired,
};

export default withServerMessages(UserQuestion);
