import React, { Component } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { signinUser } from "~actions/Users";

export class LoginForm extends Component {
	state = {
		email: "",
		password: "",
		isSubmitting: false,
	};

	static getDerivedStateFromProps(props) {
		if (props.serverError) return { isSubmitting: false };

		return null;
	}

	handleChange = ({ target: { name, value } }) =>
		this.setState({ [name]: value });

	handleSubmit = e => {
		e.preventDefault();

		const { email, password } = this.state;

		this.props.signinUser({ email, password });
	};

	render = () => (
		<div css="padding: 10px 0 40px;">
			<Head>
				<title>NextJS SSR Kit - Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<form onSubmit={this.handleSubmit}>
				Login
				<input
					name="email"
					type="email"
					onChange={this.handleChange}
					value={this.state.email}
				/>
				<input
					name="password"
					type="password"
					onChange={this.handleChange}
					value={this.state.password}
				/>
				<button type="submit" disabled={this.state.isSubmitting}>
					Submit
				</button>
			</form>
		</div>
	);
}

LoginForm.propTypes = {
	serverError: PropTypes.string,
	signinUser: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ server }) => ({
	serverError: server.error,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signinUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
