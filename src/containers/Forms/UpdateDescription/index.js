import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserProfile } from "~actions/Authentication";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import createFields from "./Fields";

export class UpdateDescriptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: createFields(props),
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
  serverError: PropTypes.string,
  serverMessage: PropTypes.string,
  showProfileForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ messages }) => ({
  serverError: messages.error,
  serverMessage: messages.message,
});

const mapDispatchToProps = {
  updateUserProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateDescriptionForm);
