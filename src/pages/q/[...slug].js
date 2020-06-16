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
import QuestionDetails from "~components/Body/QuestionDetails";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import Tooltip from "~components/Body/Tooltip";
import Editor from "~components/Forms/Editor";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import withServerMessages from "~containers/App/withServerMessages";
import CreateComment from "~containers/Forms/CreateComment";
import { parseData } from "~utils/parseResponse";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import dayjs from "~utils/dayjs";

class UserQuestion extends Component {
  state = {
    addComment: false,
  };

  toggleCommentForm = () =>
    this.setState(prevState => ({ addComment: !prevState.addComment }));

  render = () => {
    const { addComment } = this.state;
    const { data, title } = this.props;

    return (
      <>
        <Head title={`Questions - ${title || "Not Found"}`} />
        {isEmpty(data) ? (
          <div>No Questions</div>
        ) : (
          <Container centered maxWidth="750px" padding="20px">
            <div css="font-size: 12px;color: #787C7E;">
              <QuestionDetails>
                Posted by&nbsp;
                <Link blue nomargin href={`/u/${data.key}/${data.username}`}>
                  {data.username}
                </Link>
              </QuestionDetails>
              <Tooltip
                title={dayjs(data.date).format("MMMM Do, YYYY @ HH:MMa")}
              >
                <QuestionDetails>{dayjs(data.date).fromNow()}</QuestionDetails>
              </Tooltip>
              <QuestionDetails>|</QuestionDetails>
              <QuestionDetails>views: {data.views}</QuestionDetails>
            </div>
            <div css="padding: 0 10px;">
              <Affix>
                <QuestionTitle>{data.title}</QuestionTitle>
              </Affix>
              {!isEmpty(data.tags) && (
                <div css="margin-bottom: 10px;">
                  {data.tags.map(tag => (
                    <Link margin="0 5px 0 0" key={tag} href={`/t/${tag}`}>
                      <Tag>{tag}</Tag>
                    </Link>
                  ))}
                </div>
              )}
              <Editor
                classes={{
                  mdepreview: "mde-question-preview",
                  mdetextareawrapper: "mde-textarea-wrapper-question",
                }}
                disableGrip
                disableToolbar
                readOnly
                selectedTab="preview"
                value={data.body}
              />
              <div css="height: 25px;width: 100%;background: #bbb;margin-bottom: 25px;" />
              <Fade in={!addComment} timeout={{ enter: 1500, leave: 100 }}>
                <Center>
                  <Button plain width="140px" onClick={this.toggleCommentForm}>
                    Add comment
                  </Button>
                </Center>
              </Fade>
              <Collapse in={addComment}>
                <CreateComment
                  questionId={data.key}
                  cancelComment={this.toggleCommentForm}
                />
              </Collapse>
            </div>
          </Container>
        )}
      </>
    );
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store: { dispatch }, query }) => {
    let data = {};
    let title = "";
    let serverError = "";
    try {
      const { 0: key } = query.slug;
      dispatch(resetMessages());
      const res = await app.get(`q/${key}`);
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
