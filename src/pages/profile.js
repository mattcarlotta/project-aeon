import React, { PureComponent } from "react";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import Router from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { getProfile } from "~actions/Users";
import RequireAuth from "~components/Containers/RequireAuth";

class Profile extends PureComponent {
	componentDidMount() {
		if (isEmpty(this.props.settings)) Router.push("/signin");
	}

	static getInitialProps({ store, req }) {
		const cookie = get(req, ["headers", "cookie"]);
		const headers = cookie ? { headers: { cookie } } : undefined;

		store.dispatch(getProfile(headers));
	}

	render = () => (
		<RequireAuth>
			<Head>
				<title>NextJS SSR Kit - Profile</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Profile</h1>
			{!isEmpty(this.props.settings) && (
				<pre>
					<code>{JSON.stringify(this.props.settings, null, 4)}</code>
				</pre>
			)}
		</RequireAuth>
	);
}

Profile.propTypes = {
	settings: PropTypes.shape({
		_id: PropTypes.string,
		role: PropTypes.string,
		email: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
	}),
};

/* istanbul ignore next */
const mapStateToProps = ({ users }) => ({
	settings: users.settings,
});

export default connect(mapStateToProps)(Profile);
