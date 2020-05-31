import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { fetchQuestions } from "~actions/Questions";
import Head from "~components/Navigation/Head";
import Spinner from "~components/Body/Spinner";

const NewestQuestions = ({ data, isLoading }) => (
	<>
		<Head title="Newest Questions" />
		{isLoading ? (
			<Spinner />
		) : isEmpty(data) ? (
			<div>No Questions</div>
		) : (
			<div>Questions</div>
		)}
	</>
);

// TODO: CONVERT TO GETSERVERSIDEPROPS
// NewestQuestions.getInitialProps = ({ store: { dispatch } }) => {
// 	dispatch(fetchQuestions());
// };

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
					points: PropTypes.number
				})
			)
		})
	),
	isLoading: PropTypes.bool.isRequired
};

/* istanbul ignore next */
const mapStateToProps = ({ questions }) => ({ ...questions });

export default connect(mapStateToProps)(NewestQuestions);
