/* eslint-disable react/no-danger */
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
	showProfileForm,
	toggleProfileForm,
	website,
}) => (
	<TabContainer>
		{showProfileForm ? (
			<UpdateDescription
				firstname={firstname}
				lastname={lastname}
				website={website}
				description={description}
				displayname={displayname}
				showProfileForm={showProfileForm}
				closeForm={toggleProfileForm}
			/>
		) : (
			<>
				<Info>Display Name:</Info>
				{displayname ? (
					<SubTitle>{displayname}</SubTitle>
				) : (
					<p css="color: #9e9e9e;">You haven&#39;t provided a display name.</p>
				)}
				<Info>Name:</Info>
				<SubTitle>
					{firstname} {lastname}
				</SubTitle>
				<Info>Website:</Info>
				{website ? (
					<SubTitle>
						<a href={website} rel="noopener noreferrer" target="_blank">
							{website.replace(/(^\w+:|^)\/\//, "")}
						</a>
					</SubTitle>
				) : (
					<p css="color: #9e9e9e;">You haven&#39;t provided a website.</p>
				)}
				<Info>Description:</Info>
				<div>
					{description ? (
						<SubTitle>
							<div dangerouslySetInnerHTML={{ __html: description }} />
						</SubTitle>
					) : (
						<p css="color: #9e9e9e;">You haven&#39;t included a description.</p>
					)}
				</div>
				<Button radius="4px" width="200px" onClick={toggleProfileForm}>
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
	showProfileForm: PropTypes.bool.isRequired,
	toggleProfileForm: PropTypes.func.isRequired,
	website: PropTypes.string,
};

export default Profile;
/* eslint-enable react/no-danger */
