import PropTypes from "prop-types";
import styled from "styled-components";

const Website = ({ className, href }) => (
  <a
    className={className}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {href.replace(/(^\w+:|^)\/\//, "")}
  </a>
);

Website.propTypes = {
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default styled(Website)`
  color: #0075e0;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  margin: 2px 0;
  cursor: pointer;

  &:hover {
    color: #0075e0;
    text-decoration: underline;
  }

  &:focus {
    color: #0075e0;
    outline: none;
    border: 0;

`;
