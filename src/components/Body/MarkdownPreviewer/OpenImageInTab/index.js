import PropTypes from "prop-types";

const OpenImageInTab = ({ alt, src }) => (
  <a href={src} rel="noopener noreferrer" target="_blank">
    <img src={src} alt={alt} />
  </a>
);

OpenImageInTab.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

export default OpenImageInTab;
