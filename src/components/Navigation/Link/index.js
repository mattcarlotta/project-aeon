import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const LinkComponent = ({
  asHref,
  className,
  children,
  dataTest,
  href,
  onClick,
  stopPropagation,
  style,
  target,
}) => (
  <Link href={href} as={asHref} prefetch={false} passHref>
    <a
      data-test={dataTest}
      style={style}
      className={className}
      target={target}
      onClick={stopPropagation ? e => e.stopPropagation() : onClick}
    >
      {children}
    </a>
  </Link>
);

LinkComponent.propTypes = {
  asHref: PropTypes.string,
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  dataTest: PropTypes.string,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  stopPropagation: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  target: PropTypes.string,
};

LinkComponent.defaultProps = {
  onClick: () => {},
};

export default styled(LinkComponent)`
  color: ${({ blue }) => (blue ? "#0075e0" : "#000000a6")};
  white-space: nowrap;
  text-decoration: none;
  margin: ${({ margin, nomargin }) =>
    nomargin ? "0px" : margin || "0 20px 0 0"};
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${({ blue }) => (blue ? "#40a9ff" : "#03a9f3")};
  }

  &:focus {
    color: ${({ blue }) => (blue ? "#0075e0" : "#000000a6")};
    outline: none;
    border: 0;
  }
`;
