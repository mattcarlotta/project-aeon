import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import FadeIn from "~components/Body/FadeIn";
import Spinner from "~components/Body/Spinner";
import Redirect from "~components/Navigation/Redirect";

const withAuthentication = WrappedComponent => {
  const RequiresAuthentication = props => {
    const { email, role, serverError } = useSelector(
      ({ authentication, messages }) => ({
        email: authentication.email,
        role: authentication.role,
        serverError: messages.error
      })
    );

    return role === "guest" ? (
      <Redirect href="/u/signin" serverError={serverError} />
    ) : email ? (
      <WrappedComponent {...props} />
    ) : (
      <FadeIn style={{ height: "100%" }} timing="1.5s">
        <Spinner />
      </FadeIn>
    );
  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default withAuthentication;
