import PropTypes from "prop-types";
import GripButtons from "~components/Body/GripButtons";

const Fields = ({ body }) => [
  {
    name: "body",
    type: "editor",
    value: body || "",
    errors: "",
    required: true,
    classes: { mde: "mde-answer" },
    autoGrow: false,
    minEditorHeight: !body ? 200 : 80,
    css: `height: ${!body ? "300px" : "90px"};margin-top: 25px;`,
    grip: (
      <GripButtons
        cancelForm={body ? () => {} : undefined}
        submitText={body ? "Save Answer" : "Add Answer"}
      />
    ),
    disableGrip: true,
    textAreaProps: {
      placeholder: "Type here to add an answer to this question..."
    }
  }
];

Fields.propTypes = {
  body: PropTypes.string
};

export default Fields;
