import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 100%;
  padding: 12px;
  color: ${({ type }) => {
    switch (type) {
      case "error":
        return "#bf2600";
      case "info":
        return "#0058a9";
      case "warning":
        return "#886d00";
      case "success":
        return "#006703";
      default:
        return "#000";
    }
  }};
`;
