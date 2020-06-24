import PropTypes from "prop-types";
import QuestionReview from "~containers/Body/QuestionReview";
import withServerMessages from "~containers/App/withServerMessages";
import app from "~utils/axiosConfig";
import { parseData, parseCookie } from "~utils/parse";

const UserQuestion = ({ data }) => <QuestionReview {...data} />;

export const getServerSideProps = async ({ req, query }) => {
  let data = {};
  let title = "";
  let serverError = "";
  let titleId = 0;
  let redirect = false;
  let uniqueTitle = "";
  try {
    const { 0: id } = query.slug;
    const res = await app.get(`q/${id}`, parseCookie(req));

    data = parseData(res);
    title = data.title;
    titleId = data.id;
    uniqueTitle = data.uniquetitle;

    const { 1: queryTitle } = query.slug;
    redirect = queryTitle !== data.uniquetitle;
  } catch (e) {
    serverError = e.toString();
  }

  return {
    props: {
      data,
      fallbackTo: "/question-not-found",
      redirect,
      redirectAs: `/q/${titleId}/${uniqueTitle}`,
      redirectTo: "/q/[...slug]",
      serverError,
      title
    }
  };
};

UserQuestion.propTypes = {
  data: PropTypes.shape({
    answered: PropTypes.bool,
    body: PropTypes.string.isRequired,
    comments: PropTypes.number,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    downvoted: PropTypes.bool,
    key: PropTypes.number,
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    uniquetitle: PropTypes.string.isRequired,
    upvoted: PropTypes.bool,
    username: PropTypes.string.isRequired,
    views: PropTypes.number,
    votes: PropTypes.number
  })
};

export default withServerMessages(UserQuestion);
