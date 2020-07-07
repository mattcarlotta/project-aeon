/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
  @media (max-width: 768px) {
    display: block;
    margin: 0 auto;
  }
  flex-direction: ${({ direction }) => direction || "row"};
  display: flex;
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  margin: ${({ margin }) => margin || "0px"};
  width: ${({ width }) => width || "100%"};
`;
