import React, { Component } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { signinUser } from "~actions/Users";
import Button from "~components/Body/Button";
import Input from "~components/Forms/Input";
import StyledLink from "~components/Navigation/StyledLink";
import FlexCenter from "~components/Body/FlexCenter";

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
		<FlexCenter>
			<div css="width: 350px;margin: 0 auto;box-shadow: 0 2px 4px 0 rgba(181,181,181,.7);padding: 10px;background: #fff;">
				<Head>
					<title>NextJS SSR Kit - Sign In</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<h2 css="text-align: center;margin-bottom: 0px;">Sign In</h2>
				<p css="text-align: center;margin-top: 0px;">to your account</p>
				<form css="padding: 30px 12px;" onSubmit={this.handleSubmit}>
					<Input
						label="Email"
						name="email"
						type="email"
						placeholder="Account Email Address"
						onChange={this.handleChange}
						value={this.state.email}
					/>
					<Input
						label="Password"
						name="password"
						type="password"
						placeholder="Account Password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					<Button
						primary
						type="submit"
						width="100%"
						disabled={this.state.isSubmitting}
					>
						Submit
					</Button>
					<div css="text-align: center;margin-top: 40px;">
						<p>Don&#39;t have an account?</p>
						<StyledLink href="/register">
							<Button type="button">Register</Button>
						</StyledLink>
					</div>
				</form>
			</div>
		</FlexCenter>
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
