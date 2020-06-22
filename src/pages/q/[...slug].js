import { PureComponent } from "react";
import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import Router from "next/router";
import QuestionReview from "~containers/Body/QuestionReview";
import withServerMessages from "~containers/App/withServerMessages";
import app from "~utils/axiosConfig";
import { parseData, parseCookie } from "~utils/parse";

class UserQuestion extends PureComponent {
  componentDidMount() {
    if (isEmpty(this.props.data)) Router.replace("/question-not-found");
  }

  render = () =>
    !isEmpty(this.props.data) ? (
      <QuestionReview {...this.props.data} questionKey={this.props.data.key} />
    ) : null;
}

export const getServerSideProps = async ({ req, query }) => {
  let data = {};
  let title = "";
  let serverError = "";
  try {
    const { 0: key } = query.slug;
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
