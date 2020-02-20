import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserProfile } from "~actions/Users";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";

export class UpdateDescriptionForm extends Component {
	constructor(props) {
		super(props);

		const { firstname, lastname, website, displayname, description } = props;

		this.state = {
			fields: [
				{
					name: "displayname",
					type: "text",
					label: "Display Name",
					value: displayname,
					tooltip: "Adding a display name will hide your first and last name.",
					errors: "",
					required: false,
				},
				{
					name: "firstname",
					type: "text",
					label: "First Name",
					value: firstname,
					errors: "",
					required: true,
				},
				{
					name: "lastname",
					type: "text",
					label: "Last Name",
					value: lastname,
					errors: "",
					required: true,
				},
				{
					name: "website",
					type: "text",
					label: "Website",
					value: website,
					errors: "",
					tooltip:
						"You'll need to specify a full address: https://example.com.",
					required: false,
				},
				{
					name: "description",
					type: "editor",
					label: "Description",
					value: description,
					errors: "",
					required: false,
					placeholder: "Add a description...",
				},
			],
			isSubmitting: false,
		};
	}

	static getDerivedStateFromProps(props) {
		return props.serverError ? { isSubmitting: false } : null;
	}

	componentDidUpdate(prevProps) {
		const { showProfileForm, serverMessage } = this.props;

		if (
			showProfileForm &&
			serverMessage &&
			prevProps.serverMessage !== serverMessage
		) {
			this.props.closeForm();
		}
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
			if (!errors) this.props.updateUserProfile(parseFields(validatedFields));
		});
	};

	render = () => (
		<form css="width: 600px;" onSubmit={this.handleSubmit}>
			<FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
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
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	website: PropTypes.string,
	description: PropTypes.string,
	displayname: PropTypes.string,
	serverError: PropTypes.string,
	serverMessage: PropTypes.string,
	showProfileForm: PropTypes.bool.isRequired,
	closeForm: PropTypes.func.isRequired,
	updateUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ server }) => ({
	serverError: server.error,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	updateUserProfile,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UpdateDescriptionForm);
