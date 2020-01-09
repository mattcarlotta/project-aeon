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
	onContextMenu,
	onMouseDown,
	onTouchStart,
	onMouseEnter,
	onMouseLeave,
	onFocus,
	onBlur,
}) => (
	<button
		disabled={disabled}
		id={id}
		type={type || "button"}
		className={className}
		onClick={onClick}
		style={style}
		onContextMenu={onContextMenu}
		onMouseDown={onMouseDown}
		onTouchStart={onTouchStart}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		onFocus={onFocus}
		onBlur={onBlur}
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
	type: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	onContextMenu: PropTypes.func,
	onMouseDown: PropTypes.func,
	onTouchStart: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};

export default Button;
/* eslint-enable react/button-has-type */
