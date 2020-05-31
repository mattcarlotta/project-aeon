/* istanbul ignore file */
import styled from "styled-components";

export default styled.input`
	height: 100%;
	width: 100%;
	border: none;
	color: #282c34;

	&::placeholder {
		color: #bfbfbf;
	}

	&:focus {
		outline: 0;
	}
`;
