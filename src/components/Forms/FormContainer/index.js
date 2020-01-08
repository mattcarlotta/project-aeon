/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	width: 375px;
	margin: 0 auto;
	box-shadow: 0 2px 4px 0 rgba(181, 181, 181, 0.7);
	margin-top: ${({ marginTop }) => marginTop || "20vh"};
	padding: 10px;
	background: #fff;
`;
