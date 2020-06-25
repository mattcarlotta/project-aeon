import styled from "styled-components";

export default styled.div`
  width: 100%;
  text-align: left;
  background: #fff;
  position: relative;
  border-top: 1px solid #d1d5da;
  margin-top: 10px;
  padding-bottom: 5px;
  padding-top: 3px;
  background-color: #f9f9f9;

  &::before {
    content: " ";
    top: 3px;
    left: 20px;
    height: 95%;
    position: absolute;
    vertical-align: top;
    width: 2px;
    background: #d7e0e8;
    z-index: 0;
  }
`;
