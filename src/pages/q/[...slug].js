import PropTypes from "prop-types";
import QuestionReview from "~containers/Body/QuestionReview";
import withServerMessages from "~containers/App/withServerMessages";
import app from "~utils/axiosConfig";
import { parseData, parseCookie } from "~utils/parse";

const UserQuestion = ({ data }) => <QuestionReview {...data} />;

// const UserQuestion = ({ data }) => (
//   <pre>
//     <code>{JSON.stringify(data, null, 4)}</code>
//   </pre>
// );

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
    const { question } = data;
    title = question.title;
    titleId = question.id;
    uniqueTitle = question.uniquetitle;

    const { 1: queryTitle } = query.slug;
    redirect = queryTitle !== question.uniquetitle;
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
        qid: PropTypes.number,
        uid: PropTypes.string,
        date: PropTypes.string,
        rid: PropTypes.string,
        body: PropTypes.string,
        upvoted: PropTypes.bool,
        downvoted: PropTypes.bool,
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
  })
};

export default withServerMessages(UserQuestion);
