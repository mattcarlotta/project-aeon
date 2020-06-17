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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
      }
      `
      : undefined};
`;
