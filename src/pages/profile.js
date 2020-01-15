import React, { PureComponent } from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { getProfile } from "~actions/Users";
import RequireAuth from "~components/Containers/RequireAuth";

class Profile extends PureComponent {
	static getInitialProps({ store, req, res }) {
		store.dispatch(getProfile({ req, res }));
	}

	render = () => (
		<RequireAuth>
			<Head>
				<title>NextJS SSR Kit - Profile</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!isEmpty(this.props.settings) && (
				<>
					<h1>Profile</h1>
					<pre>
						<code>{JSON.stringify(this.props.settings, null, 4)}</code>
					</pre>
				</>
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
