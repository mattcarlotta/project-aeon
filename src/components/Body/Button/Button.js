/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";

const Button = ({
	disabled,
	id,
	className,
	children,
	onClick,
	style,
	type,
}) => (
	<button
		disabled={disabled}
		id={id}
		type={type}
		className={className}
		onClick={onClick}
		style={style}
	>
		{children}
	</button>
);

Button.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	onClick: PropTypes.func,
	type: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default Button;
/* eslint-enable react/button-has-type */
