import React from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import Head from "~components/Navigation/Head";

const Questions = ({ id }) => (
	<>
		<Head title={`${id} Questions`} />
		<div>Nothing to see here</div>
	</>
);

Questions.getInitialProps = ({ query }) => {
	const id = get(query, ["id"]);

	return { id: id[0].toUpperCase() + id.substring(1) };
};

Questions.propTypes = {
	id: PropTypes.string,
};

export default Questions;
