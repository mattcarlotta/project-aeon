import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import withServerMessages from "~containers/App/withServerMessages";
import QuestionOverview from "~containers/Body/QuestionOverview";
import Head from "~components/Navigation/Head";
import { parseData, parseCookie } from "~utils/parse";
import app from "~utils/axiosConfig";

const TagQuestions = ({ data, title }) =>
  !isEmpty(data) ? (
    <>
      <Head title={`Newest '${title}' Questions`} />
      {data.map(question => (
        <QuestionOverview
          {...question}
          key={question.key}
          questionKey={question.key}
        />
      ))}
    </>
  ) : null;

export const getServerSideProps = async ({ req, query }) => {
  let data = [];
  let serverError = "";
  let title = "";
  try {
    const { 0: key } = query.slug;
    const res = await app.get(`t/${key}`, parseCookie(req));
    data = parseData(res);
    title = key;
  } catch (e) {
    serverError = e.toString();
  }

  return {
    props: {
      data,
      fallbackTo: "/tag-not-found",
      serverError,
      title,
    },
  };
};

TagQuestions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
  serverError: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withServerMessages(TagQuestions);
