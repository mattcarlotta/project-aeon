import React from "react";
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Info from "~components/Body/Info";
import TabContainer from "~components/Body/TabContainer";
import SubTitle from "~components/Body/SubTitle";
import UpdateDescription from "~components/Containers/Forms/UpdateDescription";

const Profile = ({
	displayname,
	description,
	firstname,
	lastname,
	showDescriptionForm,
	toggleDescriptionForm,
	website,
}) => (
	<TabContainer>
		{showDescriptionForm ? (
			<UpdateDescription closeForm={toggleDescriptionForm} />
		) : (
			<>
				<Info>Name:</Info>
				<SubTitle>
					{firstname} {lastname}
				</SubTitle>
				<Info>Website:</Info>
				{website ? (
					<SubTitle>
						<a href={website} rel="noopener noreferrer" target="_blank">
							{website}
						</a>
					</SubTitle>
				) : (
					<p css="color: #9e9e9e;">You haven&#39;t provided a website.</p>
				)}
				<Info>Display Name:</Info>
				{displayname ? (
					<SubTitle>{displayname}</SubTitle>
				) : (
					<p css="color: #9e9e9e;">You haven&#39;t provided a display name.</p>
				)}
				<Info>Description:</Info>
				<div>
					{description ? (
						<SubTitle>{description}</SubTitle>
					) : (
						<p css="color: #9e9e9e;">You haven&#39;t included a description.</p>
					)}
				</div>
				<Button radius="4px" width="200px" onClick={toggleDescriptionForm}>
					Update Profile
				</Button>
			</>
		)}
	</TabContainer>
);

Profile.propTypes = {
	displayname: PropTypes.string,
	description: PropTypes.string,
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	showDescriptionForm: PropTypes.bool.isRequired,
	toggleDescriptionForm: PropTypes.func.isRequired,
	website: PropTypes.string,
};

export default Profile;
