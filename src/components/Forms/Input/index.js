import styled from "styled-components";
import PropTypes from "prop-types";
import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import ClickHandler from "~components/Forms/ClickHandler";

const Input = ({
	className,
	containerStyle,
	errors,
	disabled,
	inputStyle,
	label,
	name,
	onChange,
	placeholder,
	readOnly,
	type,
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
						.filter(Boolean)
						.join(" ")}
				>
					{label && (
						<Label name={name} label={label} tooltip={tooltip} htmlFor={name} />
					)}
					<input
						aria-label={name}
						tabIndex={0}
						type={type}
						name={name}
						onBlur={handleBlur}
						onChange={onChange}
						onFocus={handleFocus}
						placeholder={placeholder}
						value={value}
						style={inputStyle}
						disabled={disabled}
						readOnly={readOnly}
					/>
					{errors && <Errors>{errors}</Errors>}
				</div>
			)}
		</ClickHandler>
	</div>
);

Input.propTypes = {
	className: PropTypes.string.isRequired,
	containerStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	inputStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	tooltip: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string
};

Input.defaultProps = {
	disabled: false,
	readOnly: false
};

export default styled(Input)`
	position: relative;
	display: inline-block;
	height: 100px;
	width: 100%;
	font-family: "Valera Round", -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
		"Helvetica Neue", sans-serif;

	input {
		position: relative;
		padding: 11px;
		width: 100%;
		font-size: 16px;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		transition: border 0.2s ease-in-out;

		&:hover {
			border: 1px solid #40a9ff;
		}

		&::placeholder {
			color: #ccc;
			font-family: "Valera Round", -apple-system, BlinkMacSystemFont, "Segoe UI",
				Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
				"Helvetica Neue", sans-serif;
		}

		&:focus {
			outline: 0;
		}
	}

	.focused {
		svg {
			color: #1e90ff;
		}

		input {
			border: 1px solid #1e90ff;
		}
	}

	.error {
		input {
			border: 1px solid #d14023 !important;
		}
	}

	.disabled {
		input {
			cursor: not-allowed;
			color: rgba(0, 0, 0, 0.25);
			background: #f5f5f5;
			border: 1px solid #e6d8d8;

			&:hover {
				border: 1px solid #e6d8d8;
			}
		}
	}
`;
