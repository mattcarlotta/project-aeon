import React, { Component } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { signupUser } from "~actions/Users";

export class RegisterForm extends Component {
	state = {
		email: "",
		firstName: "",
		lastName: "",
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

		const { email, firstName, lastName, password } = this.state;

		this.props.signupUser({ email, firstName, lastName, password });
	};

	render = () => (
		<>
			<Head>
				<title>NextJS SSR Kit - Register</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 css="text-align: center;">Register</h1>
			<form css="width: 500px; margin: 0 auto;" onSubmit={this.handleSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					onChange={this.handleChange}
					value={this.state.email}
				/>
				<input
					name="firstName"
					type="text"
					placeholder="First Name"
					onChange={this.handleChange}
					value={this.state.firstName}
				/>
				<input
					name="lastName"
					type="text"
					placeholder="Last Name"
					onChange={this.handleChange}
					value={this.state.lastName}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
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

RegisterForm.propTypes = {
	serverError: PropTypes.string,
	signupUser: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ server }) => ({
	serverError: server.error,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
