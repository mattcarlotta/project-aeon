import React from "react";
import PropTypes from "prop-types";
import { Input as AntInput, Switch } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";
import Markdown from "markdown-to-jsx";
import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Input from "~components/Forms/Input";
import Select from "~components/Forms/Select";
import MDEditor from "~components/Forms/MDEditor";
import TagSelection from "~components/Forms/TagSelection";

const TextArea = AntInput.TextArea;

const switchIconStyle = {
	position: "relative",
	top: 2,
};

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
			case "switch": {
				return (
					<div key={props.name} css="height: 70px;">
						<Label {...props} style={{ marginBottom: 5 }} />
						<Switch
							aria-label="toggle switch"
							checked={props.value}
							checkedChildren={<FaCheck style={switchIconStyle} />}
							unCheckedChildren={<FaTimes style={switchIconStyle} />}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
					</div>
				);
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
					<div key={props.name} css="margin-bottom: 20px;">
						{props.label && <Label {...props} />}
						<MDEditor
							value={props.value}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						>
							<Markdown options={{ disableParsingRawHTML: true }}>
								{props.value}
							</Markdown>
						</MDEditor>
						{props.errors && <Errors>{props.errors}</Errors>}
					</div>
				);
			}
			case "textarea": {
				return (
					<div key={props.name} css="margin-bottom: 20px;">
						{props.label && <Label {...props} />}
						<TextArea
							name={props.name}
							aria-label={props.name}
							className={props.errors ? "has-error" : ""}
							disabled={props.disabled}
							maxLength={props.maxLength}
							placeholder={props.placeholder}
							style={props.innerStyle}
							onChange={onChange}
							rows={props.rows || 4}
							value={props.value}
						/>
						{props.errors && <Errors>{props.errors}</Errors>}
					</div>
				);
			}
		}
	});

FieldGenerator.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
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
