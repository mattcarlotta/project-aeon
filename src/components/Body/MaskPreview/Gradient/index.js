import styled from "styled-components";

export default styled.div`
  max-height: 250px;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    display: ${({ height }) => (height >= 240 ? "block" : "none")};
    left: 0;
    top: 0;
    background: linear-gradient(transparent 60%, white);
  }
`;
