import React from "react";
import PropTypes from "prop-types";
import FlexCenter from "~components/Body/FlexCenter";
import FadeIn from "~components/Body/FadeIn";
import Loading from "~components/Body/Loading";

const Spinner = ({ className }) => (
	<FadeIn timing="0.6s">
		<FlexCenter direction="column">
			<div className={className}>
				<div className="spinner" />
			</div>
			<Loading>Loading</Loading>
		</FlexCenter>
	</FadeIn>
);

Spinner.propTypes = {
	className: PropTypes.string.isRequired,
};

export default Spinner;
