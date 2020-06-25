import { Component } from "react";
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Flex from "~components/Body/Flex";
import FlexSpaceEvenly from "~components/Body/FlexSpaceEvenly";
import FieldGenerator from "~components/Forms/FieldGenerator";
import toast from "~components/Body/Toast";
import app from "~utils/axiosConfig";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import { parseData, parseFields } from "~utils/parse";

export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        {
          name: "body",
          type: "editor",
          value: props.value || "",
          errors: "",
          required: true,
          disableGrip: true,
          maxEditorHeight: 140,
          showCharacterLength: true,
          classes: {
            mde: "mde-comment",
            mdetextareawrapper: "mde-textarea-wrapper"
          },
          css: "margin-bottom: 10px;height: 200px;",
          maxCharacterLength: "500",
          textAreaProps: { placeholder: "Add a comment..." }
        }
      ],
      isSubmitting: false
    };
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

    this.setState(
      { fields: validatedFields, isSubmitting: !errors },
      async () => {
        if (!errors) {
          try {
            const { qid, rid } = this.props;
            const res = await app.post("c/create", {
              ...parseFields(validatedFields),
              qid,
              rid
            });
            const data = parseData(res);

            toast({ type: "success", message: data.message });

            this.props.updateQuestion(data);
          } catch (err) {
            toast({ type: "error", message: err.toString() });
            this.setState({ isSubmitting: false });
          }
        }
      }
    );
  };

  render = () => (
    <form ref={this.props.setFormRef} onSubmit={this.handleSubmit}>
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

CommentForm.propTypes = {
  cancelComment: PropTypes.func.isRequired,
  qid: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  value: PropTypes.string,
  rid: PropTypes.number.isRequired,
  setFormRef: PropTypes.func
};

export default CommentForm;
