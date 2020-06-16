import styled from "styled-components";

export default styled.span`
  padding: 2px 6px;
  font-size: 13px;
  color: #138ac2;
  background: #e6f8ff;
  border: 1px solid #87d6e8;
  border-radius: 2px;
  transition: all 0.2s ease-in-out;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: #0e5e84;
    background: #bdedff;
  }
`;
