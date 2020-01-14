import PropTypes from "prop-types";
import { connect } from "react-redux";

const RequireAuth = ({ email, children }) => (email ? children : null);

RequireAuth.propTypes = {
	email: PropTypes.string,
	children: PropTypes.node,
};

const mapStateToProps = ({ users }) => ({ email: users.email });

export default connect(mapStateToProps)(RequireAuth);
