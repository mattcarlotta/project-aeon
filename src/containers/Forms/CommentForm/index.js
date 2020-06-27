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
import fields from "./Fields";

export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: fields(props.value),
      isSubmitting: false
    };
  }

  componentDidUpdate = prevProps => {
    const { isCommenting, value } = this.props;

    if (prevProps.isCommenting !== isCommenting) {
      this.timer = setTimeout(() => {
        if (this.formRef)
          this.setState({ fields: fields(value), isSubmitting: false });
      }, 300);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
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
            const { id, qid, rid, URL } = this.props;
            const res = await app.post(URL, {
              ...parseFields(validatedFields),
              id,
              qid,
              rid
            });
            const data = parseData(res);

            toast({ type: "info", message: data.message });

            this.props.handleChange(data.comment);
          } catch (err) {
            toast({ type: "error", message: err.toString() });
            this.setState({ isSubmitting: false });
          }
        }
      }
    );
  };

  render = () => (
    <form
      ref={node => (this.formRef = node)}
      id="comment-form"
      onSubmit={this.handleSubmit}
    >
      <FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
      <Flex>
        <FlexSpaceEvenly>
          <Button danger width="135px" onClick={this.props.cancelComment}>
            Cancel
          </Button>
          <Button
            primary
            width="135px"
            type="submit"
            disabled={this.state.isSubmitting}
          >
            {!this.props.value ? "Comment" : "Save"}
          </Button>
        </FlexSpaceEvenly>
      </Flex>
    </form>
  );
}

CommentForm.propTypes = {
  id: PropTypes.string,
  cancelComment: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isCommenting: PropTypes.bool.isRequired,
  qid: PropTypes.number.isRequired,
  rid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.string,
  URL: PropTypes.string.isRequired
};

export default CommentForm;
