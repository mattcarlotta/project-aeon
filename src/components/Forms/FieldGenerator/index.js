import PropTypes from "prop-types";
import Editor from "~components/Forms/Editor";
import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Input from "~components/Forms/Input";
import Select from "~components/Forms/Select";
import TagSelection from "~components/Forms/TagSelection";
import TextArea from "~components/Forms/TextArea";

const FieldGenerator = ({ fields, onChange }) =>
  fields.map(props => {
    switch (props.type) {
      case "text":
      case "email":
      case "password": {
        return <Input {...props} key={props.name} onChange={onChange} />;
      }
      case "select": {
        return <Select {...props} key={props.name} onChange={onChange} />;
      }
      case "tag": {
        return (
          <div key={props.name} css="margin-bottom: 20px;">
            {props.label && <Label {...props} />}
            <TagSelection {...props} onChange={onChange} />
            {props.errors && <Errors>{props.errors}</Errors>}
          </div>
        );
      }
      case "editor": {
        return (
          <div
            key={props.name}
            css={props.css || "margin-bottom: 10px;min-height: 406px;"}
          >
            {props.label && <Label {...props} />}
            <Editor {...props} onChange={onChange} />
          </div>
        );
      }
      case "textarea": {
        return <TextArea {...props} key={props.name} onChange={onChange} />;
      }
    }
  });

FieldGenerator.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      css: PropTypes.string,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      placeholder: PropTypes.string,
      props: PropTypes.any,
      icon: PropTypes.string,
      value: PropTypes.any,
      errors: PropTypes.string,
      required: PropTypes.bool,
      disabled: PropTypes.bool,
      readOnly: PropTypes.bool,
      tooltip: PropTypes.string,
      selectOptions: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

FieldGenerator.defaultProps = {
  fields: [],
};

export default FieldGenerator;
