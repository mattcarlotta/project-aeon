import PropTypes from "prop-types";
import GripButtons from "~components/Body/GripButtons";

const Fields = ({ body }) => [
  {
    name: "body",
    type: "editor",
    value: body || "",
    errors: "",
    required: true,
    classes: {
      mde: "mde-answer"
    },
    autoGrow: true,
    minEditorHeight: !body ? 200 : 80,
    maxEditorHeight: 1000,
    css: `min-height: ${
      !body ? "290px" : "90px"
    };margin-top: 25px; margin-bottom: 20px;`,
    grip: (
      <GripButtons
        cancelForm={body ? () => {} : undefined}
        submitText={body ? "Save Answer" : "Submit Answer"}
      />
    ),
    disableGrip: true,
    textAreaProps: {
      placeholder: "Type here to add an answer..."
    }
  }
];

Fields.propTypes = {
  body: PropTypes.string
};

export default Fields;
