import { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import { resetMessages, setError } from "~actions/Messages";
import Head from "~components/Navigation/Head";
import toast from "~components/Body/Toast";
import QuestionOverview from "~containers/Body/QuestionOverview";
import { parseData, parseCookie } from "~utils/parseResponse";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";

class TagQuestions extends PureComponent {
  componentDidMount() {
    const { setError, serverError } = this.props;
    if (serverError) {
      setError(serverError);
      toast({ type: "error", message: serverError });
    }
  }

  render = () => {
    const { data, title } = this.props;

    return (
      <>
        <Head
          title={`${title ? `Newest '${title}' Questions` : "Not Found"}`}
        />
        {isEmpty(data) ? (
          <div>No Tagged Questions Found</div>
        ) : (
          data.map(question => (
            <QuestionOverview
              {...question}
              key={question.key}
              questionKey={question.key}
              setError={this.props.setError}
              resetMessages={this.props.resetMessages}
            />
          ))
        )}
      </>
    );
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store: { dispatch }, query }) => {
    let data = [];
    let title = "";
    let serverError = "";
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
  resetMessages: PropTypes.func.isRequired,
  serverError: PropTypes.string,
  setError: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatchToProps = { resetMessages, setError };

export default connect(null, mapDispatchToProps)(TagQuestions);
