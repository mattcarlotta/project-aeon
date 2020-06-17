/* istanbul ignore file */
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = ({ className, children }) => (
  <div className={className}>{children}</div>
);

Container.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default styled(Container)`
  ${({ fixed, top }) =>
    fixed
      ? `position: fixed;top: ${top}px;
      left: 0px;
      width: 100%;
      z-index: 1;
      
      h3 {
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
        font-size: 16px;
      }
      `
      : undefined};
`;
