import { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setError } from "~actions/Messages";
import toast from "~components/Body/Toast";

const withServerMessages = WrappedComponent => {
  class CatchServerMessages extends PureComponent {
    componentDidMount() {
      if (this.props.serverError) this.showServerError();
    }

    componentDidUpdate(prevProps) {
      const { serverError } = this.props;

      if (serverError !== prevProps.serverError && serverError !== "")
        this.showServerError();
    }

    showServerError = () => {
      const { serverError } = this.props;
      this.props.setError(serverError);
      toast({ type: "error", message: serverError });
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  CatchServerMessages.propTypes = {
    setError: PropTypes.func.isRequired,
    serverError: PropTypes.string,
  };

  return connect(null, { setError })(CatchServerMessages);
};

withServerMessages.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withServerMessages;
