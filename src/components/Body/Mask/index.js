import styled from "styled-components";

export default styled.div`
  max-height: 250px;
  overflow: hidden;
  padding: 5px 8px 10px;

  ${({ height }) =>
    height > 200
      ? ` -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);
  mask-image: linear-gradient(180deg, #000 60%, transparent);`
      : undefined}
`;
