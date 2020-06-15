import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const LinkComponent = ({
  as,
  className,
  children,
  dataTest,
  href,
  style,
  target,
}) => (
  <Link href={href} as={as} prefetch={false} passHref>
    <a data-test={dataTest} style={style} className={className} target={target}>
      {children}
    </a>
  </Link>
);

LinkComponent.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  dataTest: PropTypes.string,
  href: PropTypes.string.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  target: PropTypes.string,
};

export default styled(LinkComponent)`
  color: ${({ blue }) => (blue ? "#0075e0" : "#000000a6")};
  white-space: nowrap;
  text-decoration: none;
  margin-right: ${({ nomargin }) => (nomargin ? "0px" : "20px")};
  transition: all 0.2s ease-in-out;
  border-radius: 4px;

  &:hover {
    color: ${({ blue }) => (blue ? "#40a9ff" : "#03a9f3")};
  }

  &:focus {
    color: ${({ blue }) => (blue ? "#0075e0" : "#000000a6")};
    outline: none;
    border: 0;
  }
`;
