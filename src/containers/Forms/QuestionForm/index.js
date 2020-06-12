import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createQuestion } from "~actions/Questions";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";

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
        required: true,
      },
      {
        name: "tags",
        type: "tag",
        label: "Tags",
        placeholder: "Search for related tags...",
        tooltip: "Adding tags will make the question more specific.",
        value: [],
        errors: "",
        options: [],
        required: false,
      },
      {
        name: "body",
        type: "editor",
        label: "Question",
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
      if (!errors) this.props.createQuestion(parseFields(validatedFields));
    });
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
      <div css="width: 200px; margin: 10px auto">
        <Button primary type="submit" disabled={this.state.isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
}

UpdateDescriptionForm.propTypes = {
  serverError: PropTypes.string,
  createQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ messages }) => ({
  serverError: messages.error,
});

const mapDispatchToProps = {
  createQuestion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateDescriptionForm);
