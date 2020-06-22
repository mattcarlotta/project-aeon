import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "~actions/Authentication";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormContainer from "~components/Forms/FormContainer";
import Link from "~components/Navigation/Link";
import Head from "~components/Navigation/Head";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import { parseFields } from "~utils/parse";

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
        name: "username",
        type: "text",
        label: "Username",
        value: "",
        errors: "",
        required: true,
      },
      {
        name: "firstname",
        type: "text",
        label: "First Name",
        value: "",
        errors: "",
        required: true,
      },
      {
        name: "lastname",
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
    <FormContainer style={{ margin: "2vh auto 0" }}>
      <Head title="Register" />
      <h2 css="text-align: center;margin-bottom: 0px;">Register</h2>
      <p css="text-align: center;margin-top: 0px;">for a new account below.</p>
      <form css="padding: 30px 12px;" onSubmit={this.handleSubmit}>
        <FieldGenerator
          fields={this.state.fields}
          onChange={this.handleChange}
        />
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
          <Link href="/u/signin">
            <Button type="button">Sign In</Button>
          </Link>
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
const mapStateToProps = ({ messages }) => ({
  serverError: messages.error,
});

/* istanbul ignore next */
const mapDispatchToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
