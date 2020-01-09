import styled from "styled-components";
import Button from "./Button";

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
			return "border:1px solid #f0506e;background-color:#f0506e;color:#fff;";
		return "border:1px solid #03a9f3;background-color:transparent;color:#03a9f3;";
	}};

	&:hover {
		${props => {
			if (props.disabled)
				return "border-color:#ebebeb;background-color:#ebebeb;";
			if (props.primary)
				return "border-color:#0f7ae5;background-color:#0f7ae5;";
			if (props.danger) return "border-color:#ee395b;background-color:#ee395b;";
			return "border-color:#0f7ae5;background-color:transparent;color:#0f7ae5;";
		}};
	}
`;
