import Head from "next/head";
import PropTypes from "prop-types";

const Header = ({ title }) => (
  <Head>
    <title>{title} - Project Aeon</title>
  </Head>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
