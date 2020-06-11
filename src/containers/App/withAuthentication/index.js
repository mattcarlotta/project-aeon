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
    static getInitialProps = async ctx => {
      const {
        store: { getState },
      } = ctx;
      const { role, email } = getState().authentication;
      const { getInitialProps } = WrappedComponent;

      if (role === "guest" || !email) return { authError: accessDenied };
      if (getInitialProps) return getInitialProps(ctx);
    };

    componentDidMount = () => {
      if (this.props.authError) {
        Router.replace("/signin");
        toast({ type: "error", message: this.props.authError });
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
    authError: PropTypes.string,
    email: PropTypes.string,
  };

  const mapStateToProps = ({ authentication }) => ({
    email: authentication.email,
  });

  return connect(mapStateToProps)(RequiresAuthentication);
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withAuthentication;
