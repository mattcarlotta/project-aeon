import styled from "styled-components";
import Button from "./Button";

export default styled(Button)`
	cursor: pointer;
	color: ${props => {
		if (props.primary) return "#fff";
		if (props.danger) return "#fff";
		return "#03a9f3";
	}};
	background-color: ${props => {
		if (props.primary) return "#188fff";
		if (props.danger) return "#f0506e";
		return "transparent";
	}};
	border: 1px solid
		${props => {
			if (props.primary) return "#188fff";
			if (props.danger) return "#f0506e";
			return "#03a9f3";
		}};
	font-size: 16px;
	font-weight: ${({ weight }) => weight || "normal"};
	line-height: 26px;
	padding: ${({ padding }) => padding || "4px 16px"};
	width: ${({ width }) => width || "100%"};
	text-align: center;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	outline: none;
	border-radius: ${({ radius }) => radius || "50px"};

	&:hover {
		text-decoration: none;
		color: ${props => {
			if (props.primary) return "#fff";
			if (props.danger) return "#fff";
			return "#0f7ae5";
		}};
		background-color: ${props => {
			if (props.primary) return "#0f7ae5";
			if (props.danger) return "#be391c";
			return "transparent";
		}};
		border-color: ${props => {
			if (props.primary) return "#0f7ae5";
			if (props.danger) return "#be391c";
			return "#0f7ae5";
		}};
	}
`;
