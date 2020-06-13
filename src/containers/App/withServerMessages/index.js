import { PureComponent } from "react";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setError } from "~actions/Messages";
import toast from "~components/Body/Toast";

const withServerMessages = WrappedComponent => {
  class CatchServerMessages extends PureComponent {
    componentDidMount() {
      const { data, query, serverError, redirect } = this.props;
      if (serverError) this.showServerError();

      if (redirect && !isEmpty(data) && !isEmpty(query.slug)) {
        const { 1: queryTitle } = query.slug;
        const { uniquetitle: title } = data;

        if (queryTitle !== title)
          Router.replace(
            "/questions/[...slug]",
            `/questions/${data.key}/${title}`,
            {
              shallow: true,
            },
          );
      }
    }

    showServerError = () => {
      const { serverError } = this.props;
      this.props.setError(serverError);
      toast({ type: "error", message: serverError });
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  CatchServerMessages.propTypes = {
    data: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    query: PropTypes.shape({
      slug: PropTypes.arrayOf(PropTypes.string),
    }),
    redirect: PropTypes.bool,
    setError: PropTypes.func.isRequired,
    serverError: PropTypes.string,
  };

  return connect(null, { setError })(CatchServerMessages);
};

withServerMessages.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withServerMessages;
