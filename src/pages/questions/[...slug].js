import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { resetMessages } from "~actions/Messages";
import Affix from "~components/Body/Affix";
import Container from "~components/Body/Container";
import QuestionTitle from "~components/Body/QuestionTitle";
import Editor from "~components/Forms/Editor";
import Head from "~components/Navigation/Head";
import withServerMessages from "~containers/App/withServerMessages";
import { parseData } from "~utils/parseResponse";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import dayjs from "~utils/dayjs";

const UserQuestion = ({ data, title }) => (
  <>
    <Head title={`Questions - ${title || "Not Found"}`} />
    {isEmpty(data) ? (
      <div>No Questions</div>
    ) : (
      <Container centered maxWidth="750px" padding="20px">
        <div css="margin-right: 5px;">
          Posted by Username {dayjs(data.date).fromNow()}
        </div>
        <div>Views: {data.views}</div>
        <Affix>
          <QuestionTitle>{data.title}</QuestionTitle>
        </Affix>
        <Editor
          classes={{
            mdepreview: "mde-question-preview",
            mdetextareawrapper: "mde-textarea-wrapper-question",
          }}
          disableGrip
          disableToolbar
          selectedTab="preview"
          value={data.body}
        />
      </Container>
    )}
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store: { dispatch }, query }) => {
    let data = {};
    let title = "";
    let serverError = "";
    try {
      dispatch(resetMessages());
      const res = await app.get(`questions/${query.slug[0]}`);
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
      },
    };
  },
);

UserQuestion.propTypes = {
  data: PropTypes.shape({
    key: PropTypes.number,
    userid: PropTypes.string,
    date: PropTypes.string,
    answered: PropTypes.bool,
    views: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        userid: PropTypes.string,
        comment: PropTypes.string,
        accepted: PropTypes.bool,
        points: PropTypes.number,
      }),
    ),
  }),
  title: PropTypes.string.isRequired,
};

export default withServerMessages(UserQuestion);
