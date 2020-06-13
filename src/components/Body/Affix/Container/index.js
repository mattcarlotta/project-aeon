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
  ${({ fullscreen, fixed, offset, top }) =>
    fixed
      ? `position: fixed;top: ${top}px;
      left: ${fullscreen ? "0" : `${offset.left}px`};
      width: ${fullscreen ? "100%" : `${offset.width}px`};
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
