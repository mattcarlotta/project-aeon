import { PureComponent } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { accessDenied } from "~messages/errors";
import FadeIn from "~components/Body/FadeIn";
import Spinner from "~components/Body/Spinner";
import toast from "~components/Body/Toast";

const withAuthentication = WrappedComponent => {
  class RequiresAuthentication extends PureComponent {
    componentDidMount = () => {
      if (this.props.serverError) this.redirectToLogin();
    };

    componentDidUpdate(prevProps) {
      const { email, role } = this.props;

      if (prevProps.role !== role && role === "guest" && !email)
        this.redirectToLogin();
    }

    redirectToLogin = () => {
      const { serverError } = this.props;
      Router.replace("/u/signin");
      toast({ type: "error", message: serverError || accessDenied });
    };

    render = () =>
      this.props.email ? (
        <WrappedComponent {...this.props} />
      ) : (
        <FadeIn style={{ height: "100%" }} timing="1.5s">
          <Spinner />
        </FadeIn>
      );
  }

  RequiresAuthentication.propTypes = {
    serverError: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  };

  const mapStateToProps = ({ authentication, messages }) => ({
    email: authentication.email,
    role: authentication.role,
    serverError: messages.error
  });

  return connect(mapStateToProps)(RequiresAuthentication);
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default withAuthentication;
