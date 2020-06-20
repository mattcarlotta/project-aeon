import styled from "styled-components";

export default styled.div`
  @media (max-width: 768px) {
    margin: 0 20px;
  }

  cursor: ${({ cursor }) => cursor};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  padding: ${({ padding }) => padding || "10px"};
  text-align: left;
  border-radius: 4px;
  background: ${({ answered }) => (answered ? "#f6fff9" : "#fff")};
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding-bottom: 30px;
  transition: all 150ms ease-in-out;
  position: relative;
  border: 1px solid ${({ answered }) => (answered ? "#00da00" : "transparent")};
  margin: ${({ centered }) => (centered ? "0 auto 15px" : undefined)};

  ${({ answered, hoverable }) =>
    hoverable
      ? `&:hover {
      border-color: ${answered ? "#00da00" : "#0075e0"};
      box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }
  `
      : undefined};
`;
