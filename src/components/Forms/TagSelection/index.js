import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";
import Empty from "~components/Body/Empty";
import Spin from "~components/Body/Spin";
import Select from "./Select";

const Option = Select.Option;

const initialState = {
	data: [],
	searchText: "",
	isLoading: false,
	currentPromise: 0
};

class TagSelection extends Component {
	constructor() {
		super();
		this.fetchTag = debounce(this.fetchTag, 500);
		this.state = initialState;
		this.promiseCount = 0;
	}

	fetchTag = searchText => {
		this.promiseCount += 1;

		if (searchText) {
			this.setState(
				prevState => ({
					data: [],
					isLoading: true,
					searchText,
					currentPromise: prevState.currentPromise + 1
				}),
				this.fetchTags
			);
		} else {
			this.handleResetState();
		}
	};

	fetchTags = async () => {
		const res = await new Promise(res =>
			setTimeout(() => {
				res({
					data: [{ tag: "reactjs" }, { tag: "react-native" }]
				});
			}, 1000)
		);

		if (this.state.currentPromise === this.promiseCount) {
			const data = res.data.filter(
				({ tag }) => !this.props.value.includes(tag)
			);

			this.setState(
				{
					data,
					isLoading: false,
					currentPromise: 0
				},
				() => (this.promiseCount = 0)
			);
		}
	};

	handleResetState = () => {
		this.promiseCount = 0;
		this.setState(initialState);
	};

	handleChange = value =>
		this.props.onChange({
			target: { name: this.props.name, value }
		});

	renderNotFound = () => {
		const { data, isLoading, searchText } = this.state;
		const noData = isEmpty(data);

		return noData && !isLoading && searchText ? (
			<Empty />
		) : noData && isLoading ? (
			<Spin size="small" />
		) : null;
	};

	render = () => (
		<Select
			mode="multiple"
			value={this.props.value}
			placeholder={this.props.placeholder}
			notFoundContent={this.renderNotFound()}
			filterOption={false}
			onBlur={this.handleResetState}
			onSearch={this.fetchTag}
			onChange={this.handleChange}
			maxTagCount={10}
		>
			{this.state.data.map(({ tag }) => (
				<Option key={tag}>{tag}</Option>
			))}
		</Select>
	);
}

TagSelection.propTypes = {
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.arrayOf(PropTypes.string)
};

export default TagSelection;
