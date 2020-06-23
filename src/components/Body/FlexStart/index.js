/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: ${({ direction }) => direction || "row"};
  width: ${({ width }) => width || "100%"};
`;
