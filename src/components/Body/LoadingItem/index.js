/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
    display: inline-block;
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "1px"};
    animation: pulse 1.2s infinite;
    margin: ${({ margin }) => margin || "0px"};
  }
`;
