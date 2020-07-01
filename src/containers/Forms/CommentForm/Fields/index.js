import PropTypes from "prop-types";
import GripButtons from "~components/Body/GripButtons";

const Fields = ({ cancelComment, value }) => [
  {
    name: "body",
    type: "editor",
    value: value || "",
    errors: "",
    required: true,
    disableGrip: true,
    disableToolbar: !!value,
    maxEditorHeight: !value ? 140 : 80,
    showCharacterLength: !value,
    classes: {
      mde: "mde-comment",
      mdetextareawrapper: value ? "mde-textarea-wrapper" : undefined
    },
    css: `margin-bottom: 10px;height: ${
      !value ? "200px" : "100px"
    };margin-top:${!value ? "0px" : "5px"};`,
    maxCharacterLength: "1000",
    grip: (
      <GripButtons
        cancelForm={cancelComment}
        submitText={value ? "Save Comment" : "Add Comment"}
      />
    ),
    textAreaProps: { placeholder: "Type here to add a comment..." }
  }
];

Fields.propTypes = {
  cancelComment: PropTypes.func,
  value: PropTypes.string
};

export default Fields;
