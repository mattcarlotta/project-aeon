import PropTypes from "prop-types";
import withServerMessages from "~containers/App/withServerMessages";
import QuestionOverview from "~containers/Body/QuestionOverview";
import Head from "~components/Navigation/Head";
import app from "~utils/axiosConfig";
import { parseData, parseCookie } from "~utils/parse";

const TagQuestions = ({ data, title }) => (
  <>
    <Head title={`Newest '${title}' Questions`} />
    {data.map(question => (
      <QuestionOverview {...question} key={question.id} />
    ))}
  </>
);

export const getServerSideProps = async ({ req, query }) => {
  let data = [];
  let serverError = "";
  let title = "";
  try {
    const { 0: id } = query.slug;
    const res = await app.get(`t/${id}`, parseCookie(req));
    data = parseData(res);
    title = id;
  } catch (e) {
    serverError = e.toString();
  }

  return {
    props: {
      data,
      fallbackTo: "/tag-not-found",
      serverError,
      title
    }
  };
};

TagQuestions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      answered: PropTypes.bool,
      body: PropTypes.string.isRequired,
      comments: PropTypes.number,
      date: PropTypes.string.isRequired,
      downvoted: PropTypes.bool,
      id: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string.isRequired,
      upvoted: PropTypes.bool,
      username: PropTypes.string.isRequired,
      views: PropTypes.number,
      votes: PropTypes.number
    })
  ),
  serverError: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default withServerMessages(TagQuestions);
