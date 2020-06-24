import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 100%;
  padding: 12px;
  color: ${({ type }) => {
    switch (type) {
      case "error":
        return "#ff0000";
      case "info":
        return "#0075e0";
      case "warning":
        return "#f1c40f";
      case "success":
        return "#07bc0c";
      default:
        return "#000";
    }
  }};
`;
