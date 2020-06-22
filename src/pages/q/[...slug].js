import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import QuestionReview from "~containers/Body/QuestionReview";
import withServerMessages from "~containers/App/withServerMessages";
import app from "~utils/axiosConfig";
import { parseData, parseCookie } from "~utils/parse";

const UserQuestion = ({ data }) =>
  !isEmpty(data) ? <QuestionReview {...data} questionKey={data.key} /> : null;

export const getServerSideProps = async ({ req, query }) => {
  let data = {};
  let title = "";
  let serverError = "";
  let titleKey = 0;
  let redirect = false;
  let uniqueTitle = "";
  try {
    const { 0: key } = query.slug;
    const res = await app.get(`q/${key}`, parseCookie(req));

    data = parseData(res);
    title = data.title;
    titleKey = data.key;
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
      redirectAs: `/q/${titleKey}/${uniqueTitle}`,
      redirectTo: "/q/[...slug]",
      serverError,
      title,
    },
  };
};

UserQuestion.propTypes = {
  data: PropTypes.shape({
    answered: PropTypes.bool,
    body: PropTypes.string,
    comments: PropTypes.number,
    date: PropTypes.string,
    downvoted: PropTypes.bool,
    key: PropTypes.number,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    upvoted: PropTypes.bool,
    userkey: PropTypes.number,
    username: PropTypes.string,
    views: PropTypes.number,
    votes: PropTypes.number,
  }),
};

export default withServerMessages(UserQuestion);
