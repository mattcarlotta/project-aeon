import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
// import { connect } from "react-redux";
// import { fetchQuestions } from "~actions/Questions";
import { resetMessages } from "~actions/Messages";
import Spinner from "~components/Body/Spinner";
import toast from "~components/Body/Toast";
import Head from "~components/Navigation/Head";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
import { wrapper } from "~store";

class NewestQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      isLoading: props.isLoading,
    };
  }

  componentDidMount() {
    const { serverError } = this.props;
    if (serverError) toast({ type: "error", message: serverError });
  }

  render = () => {
    const { data, isLoading } = this.state;
    return (
      <>
        <Head title="Newest Questions" />
        {isLoading ? (
          <Spinner />
        ) : isEmpty(data) ? (
          <div>No Questions</div>
        ) : (
          <div>
            <pre css="width: 600px; overflow: scroll;">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        )}
      </>
    );
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store: { dispatch } }) => {
    let data = [];
    let serverError = "";
    try {
      dispatch(resetMessages());
      const res = await app.get(`q/all`);
      data = parseData(res);
    } catch (e) {
      serverError = e.toString();
    }

    return {
      props: {
        data,
        isLoading: false,
        serverError,
      },
    };
  },
);

NewestQuestions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
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
  ),
  isLoading: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
};

export default NewestQuestions;
