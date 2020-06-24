import { PureComponent } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { accessDenied } from "~messages/errors";
import FadeIn from "~components/Body/FadeIn";
import Spinner from "~components/Body/Spinner";
import toast from "~components/Body/Toast";

const withAuthentication = WrappedComponent => {
  class RequiresAuthentication extends PureComponent {
    componentDidMount = () => {
      if (this.props.serverError) {
        Router.replace("/u/signin");
        toast({ type: "error", message: this.props.serverError });
      }
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
    email: PropTypes.string
  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

withAuthentication.getServerSideProps = async ({ store: { getState } }) => {
  const { role, email } = getState().authentication;
  let serverError = "";
  if (role === "guest" || !email) serverError = accessDenied;

  return {
    email,
    serverError
  };
};

export default withAuthentication;
