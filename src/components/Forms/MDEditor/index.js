/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";

class MDEditor extends Component {
	state = {
		Component: null,
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ "react-smde"
			);

			await import(
				/* webpackMode: "lazy" */ "react-smde/dist/styles/react-smde.css"
			);

			if (!this.cancelImport) this.setState({ Component: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () => {
		const { Component } = this.state;

		return Component ? <Component {...this.props} /> : null;
	};
}

MDEditor.propTypes = {
	children: PropTypes.node,
};

export default MDEditor;
/* eslint-enable no-console */
