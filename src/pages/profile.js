import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import moment from "moment-timezone";
import { Col, Row, Tabs } from "antd";
import { connect } from "react-redux";
import { deleteUserAvatar } from "~actions/Users";
import Avatar from "~components/Body/Avatar";
import ProfileTab from "~components/Body/ProfileTab";
import Center from "~components/Body/Center";
import Container from "~components/Body/Container";
import TabContainer from "~components/Body/TabContainer";
import Title from "~components/Body/Title";
import SubTitle from "~components/Body/SubTitle";
import withAuth from "~components/Containers/App/withAuth";
import Head from "~components/Navigation/Head";
import Spinner from "~components/Body/Spinner";
import UploadImageForm from "~components/Containers/Forms/UploadImage";

const TabPane = Tabs.TabPane;

class Profile extends Component {
	state = {
		showProfileForm: false,
		showImageForm: false,
	};

	toggleProfileForm = () =>
		this.setState(prevState => ({
			showProfileForm: !prevState.showProfileForm,
		}));

	toggleImageForm = () =>
		this.setState(prevState => ({
			...prevState,
			showImageForm: !prevState.showImageForm,
		}));

	render = () => {
		const { settings } = this.props;
		const { showImageForm } = this.state;

		return (
			<>
				<Head title="Profile" />
				{!isEmpty(settings) ? (
					<Row gutter={10}>
						<Col {...{ md: 24, lg: 7 }}>
							<Container style={{ paddingTop: 20 }}>
								<Center>
									<div css="height: 250px;">
										{showImageForm ? (
											<UploadImageForm
												{...this.state}
												closeForm={this.toggleImageForm}
											/>
										) : (
											<Avatar
												{...this.props}
												toggleImageForm={this.toggleImageForm}
											/>
										)}
									</div>
									<Title
										style={{
											marginBottom: "15px",
											fontSize: 28,
											color: "#0f7ae5",
										}}
									>
										{settings.displayname
											? settings.displayname
											: `${settings.firstname} ${settings.lastname}`}
									</Title>
									<Title style={{ marginTop: 10 }}>Role</Title>
									<SubTitle>{settings.role}</SubTitle>
									<Title>Registered</Title>
									<SubTitle>
										{moment(settings.registered).format("MMMM Do, YYYY")}
									</SubTitle>
									<Title>Reputation</Title>
									<SubTitle>{settings.reputation}</SubTitle>
								</Center>
							</Container>
						</Col>
						<Col {...{ md: 24, lg: 17 }}>
							<Container>
								<Tabs defaultActiveKey="profile">
									<TabPane tab="Profile" key="profile">
										<ProfileTab
											{...settings}
											showProfileForm={this.state.showProfileForm}
											toggleProfileForm={this.toggleProfileForm}
										/>
									</TabPane>
									<TabPane tab="Activity" key="activity">
										<TabContainer>Activity</TabContainer>
									</TabPane>
									<TabPane tab="Edit Settings" key="edit-settings">
										<TabContainer>Edit Settings</TabContainer>
									</TabPane>
								</Tabs>
							</Container>
						</Col>
					</Row>
				) : (
					<Spinner />
				)}
			</>
		);
	};
}

Profile.propTypes = {
	deleteUserAvatar: PropTypes.func.isRequired,
	settings: PropTypes.shape({
		id: PropTypes.string,
		avatar: PropTypes.string,
		description: PropTypes.string,
		displayname: PropTypes.string,
		role: PropTypes.string,
		email: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		registered: PropTypes.string,
		reputation: PropTypes.number,
		website: PropTypes.string,
	}),
};

/* istanbul ignore next */
const mapStateToProps = ({ users }) => ({
	settings: { ...users },
});

const mapDispatchToProps = {
	deleteUserAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Profile));
