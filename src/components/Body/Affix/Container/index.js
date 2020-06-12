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
  ${({ fixed, offset, top }) =>
    fixed
      ? `position: fixed;top: ${top}px;left: ${offset.left}px;width: ${offset.width}px;z-index: 10;`
      : undefined};
`;
