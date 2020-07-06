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
    disableHotKeys: false,
    disableToolbar: !!value,
    maxEditorHeight: 140,
    showCharacterLength: !value,
    classes: {
      mde: !value ? "mde-add-comment" : "mde-edit-comment"
    },
    css: `margin-bottom: 10px;height: ${!value ? "220px" : "175px"};margin:${
      !value ? "0px" : "5px 0 0 0"
    };`,
    maxCharacterLength: "1000",
    grip: (
      <GripButtons
        cancelForm={cancelComment}
        submitText={value ? "Save" : "Add Comment"}
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
