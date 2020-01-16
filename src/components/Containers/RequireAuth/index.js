import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RequireAuth = ({ email, children }) =>
	email ? <div css="padding: 10px">{children}</div> : null;

RequireAuth.propTypes = {
	email: PropTypes.string,
	children: PropTypes.node,
};

const mapStateToProps = ({ users }) => ({ email: users.email });

export default connect(mapStateToProps)(RequireAuth);
