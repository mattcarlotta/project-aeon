import Head from "next/head";
import PropTypes from "prop-types";

const { LOCALHOST } = process.env;

const Header = ({ children, description, keywords, title, type, url }) => (
  <Head>
    <title>{title} - Project Aeon</title>
    <link rel="canonical" href={`${LOCALHOST}/${url}`} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${LOCALHOST}/${url}`} />
    <meta property="og:type" content={type} />
    {children}
  </Head>
);

Header.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  keywords: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  type: PropTypes.string
};

Header.defaultProps = {
  description: "Official website for... something.",
  type: "website"
};

export default Header;
