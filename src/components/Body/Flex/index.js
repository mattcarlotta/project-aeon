/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
  flex-direction: ${({ direction }) => direction || "row"};
  display: flex;
  justify-content: ${({ justify }) => justify || "center"};
  align-items: center;
  width: ${({ width }) => width || "100%"};
`;
