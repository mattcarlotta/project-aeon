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
		<>
			<Head>
				<title>NextJS SSR Kit - Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 css="text-align: center;">Sign In</h1>
			<form css="width: 500px; margin: 0 auto;" onSubmit={this.handleSubmit}>
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
		</>
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
