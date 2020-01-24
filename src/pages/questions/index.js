import React, { PureComponent } from "react";
import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuestions } from "~actions/Questions";
import Head from "~components/Navigation/Head";
import Spinner from "~components/Body/Spinner";

class NewestQuestions extends PureComponent {
	static getInitialProps({ store: { dispatch } }) {
		dispatch(fetchQuestions());
	}

	render = () => (
		<>
			<Head title="Newest Questions" />
			{this.props.isLoading ? (
				<Spinner />
			) : isEmpty(this.props.data) ? (
				<div>No Questions</div>
			) : (
				<div>Questions</div>
			)}
		</>
	);
}

NewestQuestions.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			userid: PropTypes.string,
			date: PropTypes.string,
			answered: PropTypes.bool,
			views: PropTypes.number,
			title: PropTypes.string,
			body: PropTypes.string,
			tags: PropTypes.arrayOf(PropTypes.string),
			comments: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					userid: PropTypes.string,
					comment: PropTypes.string,
					accepted: PropTypes.bool,
					points: PropTypes.number,
				}),
			),
		}),
	),
	isLoading: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ questions }) => ({ ...questions });

export default connect(mapStateToProps)(NewestQuestions);
