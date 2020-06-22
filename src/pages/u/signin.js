import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signinUser } from "~actions/Authentication";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormContainer from "~components/Forms/FormContainer";
import Link from "~components/Navigation/Link";
import Head from "~components/Navigation/Head";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import { parseFields } from "~utils/parse";

export class LoginForm extends Component {
  state = {
    fields: [
      {
        name: "username",
        type: "text",
        label: "Username",
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
      if (!errors) this.props.signinUser(parseFields(validatedFields));
    });
  };

  render = () => (
    <FormContainer>
      <Head title="Sign In" />
      <h2 css="text-align: center;margin-bottom: 0px;">Sign In</h2>
      <p css="text-align: center;margin-top: 0px;">to your account below.</p>
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
          Submit
        </Button>
        <div css="text-align: center;margin-top: 40px;">
          <p>Don&#39;t have an account?</p>
          <Link href="/u/register">
            <Button type="button">Register</Button>
          </Link>
        </div>
      </form>
    </FormContainer>
  );
}

LoginForm.propTypes = {
  serverError: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ messages }) => ({
  serverError: messages.error,
});

/* istanbul ignore next */
const mapDispatchToProps = {
  signinUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
