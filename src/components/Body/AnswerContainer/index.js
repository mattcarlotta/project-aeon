import styled from "styled-components";

export default styled.div`
  @media (max-width: 768px) {
    margin: 0 20px;
  }

  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  padding: 0px;
  text-align: left;
  border-radius: 4px;
  background: transparent;
  position: relative;
  margin: ${({ centered, margin }) =>
    centered ? "0 auto 45px" : margin || undefined};
`;
