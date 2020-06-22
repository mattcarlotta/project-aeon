import { PureComponent } from "react";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "~components/Body/Toast";

const withServerMessages = WrappedComponent => {
  class CatchServerMessages extends PureComponent {
    componentDidMount() {
      const {
        data,
        fallbackTo,
        serverError,
        redirect,
        redirectAs,
        redirectTo,
      } = this.props;
      const noData = isEmpty(data);

      if (serverError) toast({ type: "error", message: serverError });

      if (fallbackTo && noData) Router.replace(fallbackTo);

      if (redirect && !noData)
        Router.replace(redirectTo, redirectAs, {
          shallow: true,
        });
    }

    render = () => <WrappedComponent {...this.props} />;
  }

  CatchServerMessages.propTypes = {
    data: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    fallbackTo: PropTypes.string,
    redirect: PropTypes.bool,
    redirectAs: PropTypes.string,
    redirectTo: PropTypes.string,
    serverError: PropTypes.string,
  };

  CatchServerMessages.defaultProps = {
    redirect: false,
  };

  return CatchServerMessages;
};

withServerMessages.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withServerMessages;
