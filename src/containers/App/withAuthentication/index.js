import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessDenied } from "~messages/errors";
import { wrapper } from "~store";
import { signoutUser } from "~actions/Authentication";
import FadeIn from "~components/Body/FadeIn";
import Spinner from "~components/Body/Spinner";
import toast from "~components/Body/Toast";

const withAuthentication = WrappedComponent => {
	class RequiresAuthentication extends PureComponent {
		componentDidMount = () => {
			if (this.props.authError) {
				this.props.signoutUser();
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
		email: PropTypes.string,
		signoutUser: PropTypes.func.isRequired
	};

	const mapStateToProps = ({ authentication }) => ({
		email: authentication.email
	});

	const mapDispatchToProps = { signoutUser };

	return connect(mapStateToProps, mapDispatchToProps)(RequiresAuthentication);
};

withAuthentication.propTypes = {
	WrappedComponent: PropTypes.node.isRequired
};

export const getServerSideProps = wrapper.getServerSideProps(ctx => {
	const {
		store: { getState }
	} = ctx;
	const { getServerSideProps } = WrappedComponent;
	const { email } = getState().authenticated;

	if (!email) return { authError: accessDenied };
	if (getServerSideProps) return getServerSideProps(ctx);
});

export default withAuthentication;
