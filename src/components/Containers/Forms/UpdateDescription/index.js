import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { signinUser } from "~actions/Users";
import Button from "~components/Body/Button";
import Input from "~components/Forms/Input";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
// import parseFields from "~utils/parseFields";

export class UpdateDescriptionForm extends Component {
	state = {
		fields: [
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
				name: "website",
				type: "text",
				label: "Website",
				value: "",
				errors: "",
				required: false,
			},
			{
				name: "displayName",
				type: "text",
				label: "Display Name",
				value: "",
				errors: "",
				required: false,
			},
			{
				name: "description",
				type: "textarea",
				label: "Description",
				value: "",
				errors: "",
				required: false,
			},
		],
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
			// if (!errors) this.props.signinUser(parseFields(validatedFields));
		});
	};

	render = () => (
		<form css="width: 400px;" onSubmit={this.handleSubmit}>
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
				Update
			</Button>
			<Button
				type="button"
				width="100%"
				style={{ marginTop: 10 }}
				onClick={this.props.closeForm}
			>
				Cancel
			</Button>
		</form>
	);
}

UpdateDescriptionForm.propTypes = {
	serverError: PropTypes.string,
	closeForm: PropTypes.func.isRequired,
};

const mapStateToProps = ({ server }) => ({
	serverError: server.error,
});

export default connect(mapStateToProps, {})(UpdateDescriptionForm);
