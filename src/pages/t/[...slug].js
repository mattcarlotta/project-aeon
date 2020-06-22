import { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { resetMessages } from "~actions/Messages";
import toast from "~components/Body/Toast";
import QuestionOverview from "~containers/Body/QuestionOverview";
import Head from "~components/Navigation/Head";
import { parseData, parseCookie } from "~utils/parse";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";

class TagQuestions extends PureComponent {
  componentDidMount() {
    const { data, serverError } = this.props;
    if (serverError) toast({ type: "error", message: serverError });
    if (isEmpty(data)) Router.replace("/tag-not-found");
  }

  render = () => {
    const { data, title } = this.props;

    return !isEmpty(data) ? (
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
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store: { dispatch }, query }) => {
    let data = [];
    let serverError = "";
    let title = "";
    try {
      const { 0: key } = query.slug;
      dispatch(resetMessages());
      const res = await app.get(`t/${key}`, parseCookie(req));
      data = parseData(res);
      title = key;
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

export default TagQuestions;
