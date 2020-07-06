import { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import toast from "~components/Body/Toast";
import { accessDenied } from "~messages/errors";

const Redirect = ({ href, as, options, push, serverError }) => {
  useEffect(() => {
    const method = push ? Router.push : Router.replace;
    method(href, as, options);

    return () => {
      toast({ type: "error", message: serverError || accessDenied });
    };
  }, []);

  return null;
};

Redirect.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  options: PropTypes.shape({
    shallow: PropTypes.string
  }),
  push: PropTypes.bool,
  serverError: PropTypes.string
};

export default Redirect;
