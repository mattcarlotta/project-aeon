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
  background: ${({ answered, deleted }) => {
    if (answered) return "#f6fff9";
    if (deleted) return "#e8d6d6";
    return "#fff";
  }};
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  transition: all 150ms ease-in-out;
  position: relative;
  border: 1px solid ${({ answered }) => (answered ? "#00da00" : "transparent")};
  margin: ${({ centered, margin }) =>
    centered ? "0 auto 45px" : margin || undefined};

  ${({ answered, hoverable }) =>
    hoverable
      ? `&:hover {
      border-color: ${answered ? "#00da00" : "#c6dff7"};
      box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }
  `
      : undefined};
`;
