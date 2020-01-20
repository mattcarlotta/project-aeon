import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkAuth } from "~actions/Users";
import Spinner from "~components/Body/Spinner";

const withAuth = WrappedComponent => {
	class RequiresAuthentication extends PureComponent {
		static async getInitialProps(ctx) {
			const {
				store: { dispatch },
				req,
				res,
			} = ctx;

			dispatch(checkAuth({ req, res }));

			if (WrappedComponent.getInitialProps) {
				await WrappedComponent.getInitialProps(ctx);
			}
		}

		render = () =>
			this.props.email ? <WrappedComponent {...this.props} /> : <Spinner />;
	}

	RequiresAuthentication.propTypes = {
		email: PropTypes.string,
	};

	const mapStateToProps = ({ users }) => ({ email: users.email });

	return connect(mapStateToProps)(RequiresAuthentication);
};

withAuth.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default withAuth;
