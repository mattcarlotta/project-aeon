/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";

class FroalaEditor extends Component {
	state = {
		Component: null,
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ "react-froala-wysiwyg"
			);

			await import(/* webpackMode: "lazy" */ "~components/Forms/Editor/Styles");

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

FroalaEditor.propTypes = {
	children: PropTypes.node,
};

export default FroalaEditor;
/* eslint-enable no-console */
