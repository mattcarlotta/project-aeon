import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import ClickHandler from "~components/Forms/ClickHandler";

const TextArea = ({
	className,
	containerStyle,
	disabled,
	errors,
	label,
	name,
	placeholder,
	onChange,
	readOnly,
	rows,
	style,
	tooltip,
	value
}) => (
	<div data-testid={name} className={className} style={containerStyle}>
		<ClickHandler value={value}>
			{({ isFocused, handleBlur, handleFocus }) => (
				<div
					className={[
						isFocused && "focused",
						errors && "error",
						disabled && "disabled"
					]
						.filter(c => !!c)
						.join(" ")}
				>
					{label && (
						<Label name={name} label={label} tooltip={tooltip} htmlFor={name} />
					)}
					<textarea
						aria-label={name}
						data-testid={name}
						disabled={disabled}
						name={name}
						onChange={onChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={placeholder}
						readOnly={readOnly}
						rows={rows || 10}
						style={style}
						tabIndex={0}
						value={value}
					/>
					{errors && <Errors>{errors}</Errors>}
				</div>
			)}
		</ClickHandler>
	</div>
);

TextArea.propTypes = {
	className: PropTypes.string.isRequired,
	containerStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
	rows: PropTypes.number,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	tooltip: PropTypes.string,
	value: PropTypes.string
};

export default styled(TextArea)`
	@media (max-width: 768px) {
		display: block !important;
		width: 100% !important;
	}
	min-height: 230px;
	padding: 0 10px;
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;

	textarea {
		padding: 10px;
		height: 173px;
		overflow-y: auto;
		width: 100%;
		background: #fff;
		color: #3a3a3a;
		border: 1px solid ${({ errors }) => (errors ? "#d03916" : "#d3d3d3")};
		border-radius: 4px;
		transition: 0.2s ease-in-out;
		transition-property: color, border;
		resize: none;
		&::placeholder {
			color: #bbb;
		}
		&:focus {
			outline: 0;
			border: 1px solid #1890ff;
		}
	}
`;
