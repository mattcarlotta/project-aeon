import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
// import parseFields from "~utils/parseFields";

export class UpdateDescriptionForm extends Component {
	state = {
		fields: [
			{
				name: "title",
				type: "text",
				label: "Title",
				placeholder: "Enter a question title...",
				value: "",
				errors: "",
				required: true
			},
			{
				name: "tag",
				type: "tag",
				label: "Tags",
				placeholder: "Search for related tags...",
				tooltip: "Selecting tags will make the question more specific!",
				value: [],
				errors: "",
				options: [],
				required: false
			},
			{
				name: "question",
				type: "editor",
				label: "Question",
				value: "",
				errors: "",
				required: true
			}
		],
		isSubmitting: false
	};

	static getDerivedStateFromProps(props) {
		return props.serverError ? { isSubmitting: false } : null;
	}

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value)
		}));
	};

	handleSubmit = e => {
		e.preventDefault();

		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			// if (!errors) this.props.updateUserProfile(parseFields(validatedFields));
		});
	};

	render = () => (
		<form onSubmit={this.handleSubmit}>
			<FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
			<Button
				primary
				type="submit"
				width="200px"
				style={{ marginTop: 10 }}
				disabled={this.state.isSubmitting}
			>
				Submit
			</Button>
		</form>
	);
}

UpdateDescriptionForm.propTypes = {
	serverError: PropTypes.string
};

const mapStateToProps = ({ messages }) => ({
	serverError: messages.error
});

// const mapDispatchToProps = {
// 	updateUserProfile,
// };

export default connect(
	mapStateToProps
	// mapDispatchToProps,
)(UpdateDescriptionForm);
