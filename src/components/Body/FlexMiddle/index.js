/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	flex-direction: ${({ direction }) => direction || "row"};
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 100%;
`;
