import styled from "styled-components";
import Col from "~components/Body/Col";

export default styled.div`
	position: relative;
	height: auto;
	margin-right: 0;
	margin-left: 0;
	zoom: 1;
	display: block;
	box-sizing: border-box;

	& ${Col} {
		padding: ${({ padding }) => padding || 0};
	}

	&::before,
	&::after {
		display: table;
		content: "";
	}

	&::after {
		clear: both;
	}
`;
