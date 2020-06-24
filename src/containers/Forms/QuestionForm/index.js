import { Component } from "react";
import Router from "next/router";
import Button from "~components/Body/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import toast from "~components/Body/Toast";
import app from "~utils/axiosConfig";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import { parseData, parseFields } from "~utils/parse";

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
        maxLength: 250
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
        required: true
      },
      {
        name: "body",
        type: "editor",
        label: "Question",
        value: "",
        errors: "",
        required: true
      }
    ],
    isSubmitting: false
  };

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
            const res = await app.post(
              "q/create",
              parseFields(validatedFields)
            );
            const data = parseData(res);

            toast({ type: "success", message: data.message });

            Router.push("/q/[...slug]", `/q/${data.id}/${data.title}`);
          } catch (err) {
            toast({ type: "error", message: err.toString() });
            this.setState({ isSubmitting: false });
          }
        }
      }
    );
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

export default UpdateDescriptionForm;
