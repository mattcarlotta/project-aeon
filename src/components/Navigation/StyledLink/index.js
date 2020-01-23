import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const StyledLink = ({ children, href, ...rest }) => (
	<Link href={href} prefetch={false}>
		<a css="height: 100%;width:100%;" {...rest} className="link">
			{children}
		</a>
	</Link>
);

StyledLink.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default StyledLink;
