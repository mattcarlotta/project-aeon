/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	flex-direction: ${({ direction }) => direction || "row"};
	display: flex;
	align-items: center;
	height: 100%;
`;
