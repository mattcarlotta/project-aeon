/* eslint-disable react/button-has-type */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = React.forwardRef(
	(
		{
			className,
			children,
			dataTestId,
			disabled,
			onBlur,
			onContextMenu,
			onClick,
			onFocus,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			onTouchStart,
			style,
			type
		},
		ref
	) => (
		<button
			ref={ref}
			aria-label="button"
			data-testid={dataTestId}
			className={className}
			disabled={disabled}
			onBlur={onBlur}
			onClick={onClick}
			onContextMenu={onContextMenu}
			onFocus={onFocus}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onTouchStart={onTouchStart}
			style={style}
			tabIndex={0}
			type={type}
		>
			{children}
		</button>
	)
);

Button.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	dataTestId: PropTypes.string,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onContextMenu: PropTypes.func,
	onFocus: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onTouchStart: PropTypes.func,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	type: PropTypes.string
};

Button.defaultProps = {
	disabled: false,
	type: "button"
};

export default styled(Button)`
	font-size: 16px;
	line-height: 26px;
	text-align: center;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	outline: none;
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
	width: ${({ width }) => width || "100%"};
	padding: ${({ padding }) => padding || "4px 16px"};
	font-weight: ${({ weight }) => weight || "normal"};
	border-radius: ${({ radius }) => radius || "50px"};
	${props => {
		if (props.disabled)
			return "border:1px solid #ebebeb;background-color:#ebebeb;color:#bbb;";
		if (props.primary)
			return "border:1px solid #188fff;background-color:#188fff;color:#fff;";
		if (props.danger)
			return "border:1px solid #f0506e;background-color:transparent;color:#f0506e;";
		return "border:1px solid #03a9f3;background-color:transparent;color:#03a9f3;";
	}};

	&:hover {
		${props => {
			if (props.disabled)
				return "border-color:#ebebeb;background-color:#ebebeb;";
			if (props.primary)
				return "border-color:#0f7ae5;background-color:#0f7ae5;";
			if (props.danger)
				return "border-color:#ee395b;background-color:transparent;color:#ee395b;";
			return "border-color:#0f7ae5;background-color:transparent;color:#0f7ae5;";
		}};
	}
`;
