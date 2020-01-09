import React, { Component } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { connect } from "react-redux";
import { signupUser } from "~actions/Users";
import Button from "~components/Body/Button";
import Input from "~components/Forms/Input";
import FormContainer from "~components/Forms/FormContainer";
import StyledLink from "~components/Navigation/StyledLink";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";

export class RegisterForm extends Component {
	state = {
		fields: [
			{
				name: "email",
				type: "email",
				label: "Email",
				value: "",
				errors: "",
				required: true,
			},
			{
				name: "firstName",
				type: "text",
				label: "First Name",
				value: "",
				errors: "",
				required: true,
			},
			{
				name: "lastName",
				type: "text",
				label: "Last Name",
				value: "",
				errors: "",
				required: true,
			},
			{
				name: "password",
				type: "password",
				label: "Password",
				value: "",
				errors: "",
				required: true,
			},
		],
		isSubmitting: false,
	};

	static getDerivedStateFromProps(props) {
		return props.serverError ? { isSubmitting: false } : null;
	}

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();

		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			if (!errors) this.props.signupUser(parseFields(validatedFields));
		});
	};

	render = () => (
		<FormContainer marginTop="10vh">
			<Head>
				<title>NextJS SSR Kit - Register</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 css="text-align: center;margin-bottom: 0px;">Register</h2>
			<p css="text-align: center;margin-top: 0px;">for a new account below.</p>
			<form css="padding: 30px 12px;" onSubmit={this.handleSubmit}>
				{this.state.fields.map(props => (
					<Input key={props.name} onChange={this.handleChange} {...props} />
				))}
				<Button
					primary
					type="submit"
					width="100%"
					style={{ marginTop: 10 }}
					disabled={this.state.isSubmitting}
				>
					Sign Up
				</Button>
				<div css="text-align: center;margin-top: 40px;">
					<p>Already have an account?</p>
					<StyledLink href="/signin">
						<Button type="button">Sign In</Button>
					</StyledLink>
				</div>
			</form>
		</FormContainer>
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
