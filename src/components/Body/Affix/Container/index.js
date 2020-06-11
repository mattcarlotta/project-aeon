/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
  ${({ fixed, offset, top }) =>
    fixed
      ? `position: "fixed"; top: ${top}; left: ${offset.left}; width: ${offset.width};zIndex: 10;`
      : undefined};
`;
