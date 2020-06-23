/* istanbul ignore file */
import styled from "styled-components";

export default styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  user-select: none;

  a,
  button {
    color: #000000a6;
    transition: none;

    &:hover {
      color: #fff;
    }
  }

  &:hover {
    background-color: #0075e0;
  }
`;
