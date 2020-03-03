import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Empty, Select, Spin, Tag } from "antd";
import debounce from "lodash.debounce";

const { Option } = Select;

const initialState = {
	data: [],
	searchText: "",
	isLoading: false,
	currentPromise: 0,
};

class TagSelection extends Component {
	constructor(props) {
		super(props);
		this.promiseCount = 0;
		this.fetchTag = debounce(this.fetchTag, 500);
		this.state = initialState;
	}

	fetchTag = searchText => {
		this.promiseCount += 1;

		if (searchText) {
			this.setState(
				prevState => ({
					data: [],
					isLoading: true,
					searchText,
					currentPromise: prevState.currentPromise + 1,
				}),
				async () => {
					const res = await new Promise(res =>
						setTimeout(() => {
							res({
								data: [{ tag: "reactjs" }, { tag: "react-native" }],
							});
						}, 1000),
					);

					if (this.state.currentPromise === this.promiseCount) {
						const { value } = this.props;
						const data = res.data.filter(({ tag }) => !value.includes(tag));

						this.setState(
							{
								data,
								isLoading: false,
								currentPromise: 0,
							},
							() => (this.promiseCount = 0),
						);
					}
				},
			);
		} else {
			this.handleResetState();
		}
	};

	handleResetState = () => {
		this.promiseCount = 0;
		this.setState(initialState);
	};

	handleChange = value =>
		this.props.onChange({
			target: { name: this.props.name, value },
		});

	renderTags = props => (
		<Tag color="1px solid #188fff">Hello{console.log(props)}</Tag>
	);

	renderNotFound = () => {
		const { data, isLoading, searchText } = this.state;
		const noData = isEmpty(data);

		return noData && !isLoading && searchText ? (
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
			tagRender={() => null}
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
	value: PropTypes.arrayOf(PropTypes.string),
};

export default TagSelection;
