import styled from "styled-components";

export default styled.div`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  padding: ${({ padding }) => padding || "10px"};
  text-align: left;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding-bottom: 30px;
  margin-bottom: 20px;
  ${({ centered }) =>
    centered ? "margin-left: auto;margin-right:auto;" : undefined}
`;
