import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createComment } from "~actions/Questions";
import Button from "~components/Body/Button";
import Flex from "~components/Body/Flex";
import FlexSpaceEvenly from "~components/Body/FlexSpaceEvenly";
import FieldGenerator from "~components/Forms/FieldGenerator";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";

export class CreateCommentForm extends Component {
  state = {
    fields: [
      {
        name: "comment",
        type: "editor",
        value: "",
        errors: "",
        required: true,
        disableGrip: true,
        maxEditorHeight: 140,
        showCharacterLength: true,
        classes: { mde: "mde-comment" },
        css: "margin-bottom: 10px;height: 200px;",
        maxCharacterLength: "500",
        textAreaProps: { placeholder: "Add a comment..." },
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
      if (!errors) {
        const { questionId } = this.props;
        this.props.createComment({
          questionId,
          ...parseFields(validatedFields),
        });
      }
    });
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
      <Flex>
        <FlexSpaceEvenly>
          <Button danger width="150px" onClick={this.props.cancelComment}>
            Cancel
          </Button>
          <Button
            primary
            width="150px"
            type="submit"
            disabled={this.state.isSubmitting}
          >
            Comment
          </Button>
        </FlexSpaceEvenly>
      </Flex>
    </form>
  );
}

CreateCommentForm.propTypes = {
  cancelComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  serverError: PropTypes.string,
};

const mapStateToProps = ({ messages }) => ({
  serverError: messages.error,
});

const mapDispatchToProps = {
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);
