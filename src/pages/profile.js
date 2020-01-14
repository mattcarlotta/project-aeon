import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { getProfile } from "~actions/Users";

class Profile extends PureComponent {
	componentDidMount() {
		this.props.getProfile();
	}

	render = () => (
		<>
			<Head>
				<title>NextJS SSR Kit - Profile</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Profile</h1>
			<pre>
				<code>{JSON.stringify(this.props.settings, null, 4)}</code>
			</pre>
		</>
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
	getProfile: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ users }) => ({
	settings: users.settings,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
