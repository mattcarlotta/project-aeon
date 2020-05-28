import React, { Component } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import Head from "~components/Navigation/Head";

class Questions extends Component {
	constructor(props) {
		super(props);
		const id = get(query, ["id"]);
		this.state = { id: id[0].toUpperCase() + id.substring(1) };
	}

	render = () => (
		<>
			<Head title={`${this.state.id} Questions`} />
			<div>Nothing to see here</div>
		</>
	);
}

Questions.propTypes = {
	id: PropTypes.string
};

export default Questions;
