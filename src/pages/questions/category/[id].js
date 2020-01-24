import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import Head from "~components/Navigation/Head";

class Questions extends PureComponent {
	static getInitialProps({ query }) {
		const id = get(query, ["id"]);

		return { id: id[0].toUpperCase() + id.slice(1) };
	}

	render = () => (
		<>
			<Head title={`${this.props.id} Questions`} />
			<div>Nothing to see here</div>
		</>
	);
}

Questions.propTypes = {
	id: PropTypes.string,
};

export default Questions;
