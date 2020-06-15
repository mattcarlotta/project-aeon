import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { resetMessages } from "~actions/Messages";
import Affix from "~components/Body/Affix";
import Container from "~components/Body/Container";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import Editor from "~components/Forms/Editor";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
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
        <div css="font-size: 12px;color: #787C7E;">
          <span css="margin-right: 5px;">
            Posted by{" "}
            <Link blue nomargin href={`/u/${data.key}/${data.username}`}>
              {data.username}&nbsp;&#40;{data.userrep}&#41;
            </Link>
          </span>
          <span css="margin-right: 5px;">|</span>
          <span css="margin-right: 5px;">{dayjs(data.date).fromNow()}</span>
          <span css="margin-right: 5px;">|</span>
          <span css="margin-right: 5px;">views: {data.views}</span>
        </div>
        <div css="padding: 0 10px;">
          <Affix>
            <QuestionTitle>{data.title}</QuestionTitle>
          </Affix>
          {!isEmpty(data.tags) && (
            <div css="margin-bottom: 10px;">
              {data.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
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
            selectedTab="preview"
            value={data.body}
          />
        </div>
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
