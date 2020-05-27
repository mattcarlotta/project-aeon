import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Header = ({ title }) => (
	<Head>
		<title>Project Aeon - {title}</title>
	</Head>
);

Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;
