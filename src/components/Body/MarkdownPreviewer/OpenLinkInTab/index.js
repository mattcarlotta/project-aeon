import PropTypes from "prop-types";

const OpenLinkInTab = ({ children, href }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
);

OpenLinkInTab.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

export default OpenLinkInTab;
