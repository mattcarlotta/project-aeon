import { Component } from "react";
import PropTypes from "prop-types";
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
      fields: fields(props),
      isSubmitting: false
    };
  }

  componentDidUpdate = prevProps => {
    const { isCommenting } = this.props;

    if (prevProps.isCommenting !== isCommenting) {
      this.timer = setTimeout(() => {
        if (this.formRef)
          this.setState({ fields: fields(this.props), isSubmitting: false });
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

            this.props.handleSubmit(data.comment);
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
      id={this.props.formId}
      onSubmit={this.handleSubmit}
    >
      <FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
    </form>
  );
}

CommentForm.propTypes = {
  id: PropTypes.string,
  formId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isCommenting: PropTypes.bool.isRequired,
  qid: PropTypes.number.isRequired,
  rid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  URL: PropTypes.string.isRequired
};

export default CommentForm;
