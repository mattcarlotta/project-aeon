import { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
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

export class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: fields(this.props),
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
          const { alertType, handleSubmit, id, URL } = this.props;
          try {
            const res = await app.post(URL, {
              ...parseFields(validatedFields),
              id
            });
            const data = parseData(res);

            toast({ type: alertType, message: data.message });

            if (handleSubmit) {
              handleSubmit(data.question);
            } else {
              Router.push("/q/[...slug]", `/q/${data.id}/${data.title}`);
            }
          } catch (err) {
            toast({ type: "error", message: err.toString() });
            this.setState({ isSubmitting: false });
          }
        }
      }
    );
  };

  render = () => (
    <form id={this.props.formId} onSubmit={this.handleSubmit}>
      <FieldGenerator fields={this.state.fields} onChange={this.handleChange} />
      <Flex>
        <FlexSpaceEvenly>
          <Button danger width="135px" onClick={this.props.cancelQuestion}>
            Cancel
          </Button>
          <Button
            primary
            width="135px"
            type="submit"
            disabled={this.state.isSubmitting}
          >
            {!this.props.body ? "Comment" : "Save"}
          </Button>
        </FlexSpaceEvenly>
      </Flex>
    </form>
  );
}

QuestionForm.propTypes = {
  alertType: PropTypes.string.isRequired,
  body: PropTypes.string,
  cancelQuestion: PropTypes.func.isRequired,
  formId: PropTypes.string,
  id: PropTypes.number,
  handleSubmit: PropTypes.func,
  URL: PropTypes.string.isRequired
};

export default QuestionForm;
