import PropTypes from "prop-types";
import MDEditor from "react-smde";
import Errors from "~components/Forms/Errors";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";

const Editor = ({ classes, name, errors, onChange, value, ...rest }) => (
  <>
    <MDEditor
      value={value}
      classes={{
        mde: "mde-editor",
        mdegrip: "mde-grip",
        mdepreview: `mde-preview ${!value ? "mde-preview-empty" : ""}`,
        mdetoolbar: "mde-toolbar",
        mdetooltip: "tooltip-container",
        mdetooltiparrow: "tooltip-arrow",
        mdetextarea: "mde-textarea",
        mdetextareawrapper: `mde-textarea-wrapper ${errors ? "has-error" : ""}`,
        ...classes,
      }}
      maxEditorWidth="100%"
      onChange={newValue => onChange({ target: { name, value: newValue } })}
      {...rest}
    >
      <MarkdownPreviewer>{value || "(empty)"}</MarkdownPreviewer>
    </MDEditor>
    {errors && <Errors>{errors}</Errors>}
  </>
);

Editor.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  errors: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Editor.defaultProps = {
  classes: {},
  value: "",
};

export default Editor;
