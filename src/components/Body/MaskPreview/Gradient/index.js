import styled from "styled-components";

export default styled.div`
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  overflow: hidden;
  position: relative;
  word-break: break-word;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    display: ${({ height, maxHeight, maskHeight }) =>
      height >= maxHeight - maskHeight ? "block" : "none"};
    left: 0;
    top: 0;
    background: linear-gradient(transparent 60%, white);
  }
`;
