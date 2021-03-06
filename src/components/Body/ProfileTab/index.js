/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Info from "~components/Body/Info";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import MissingDetails from "~components/Body/MissingDetails";
import SubTitle from "~components/Body/SubTitle";
import TabContainer from "~components/Body/TabContainer";
import UpdateDescription from "~containers/Forms/UpdateDescription";

const subtitleStyle = {
	padding: "5px 10px"
};

const Profile = ({
	displayname,
	description,
	firstname,
	lastname,
	showProfileForm,
	toggleProfileForm,
	website
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
					<SubTitle style={subtitleStyle}>{displayname}</SubTitle>
				) : (
					<MissingDetails>
						Use a display name if you wish to hide your real name.
					</MissingDetails>
				)}
				<Info>Name:</Info>
				<SubTitle style={subtitleStyle}>
					{firstname} {lastname}
				</SubTitle>
				<Info>Website:</Info>
				{website ? (
					<SubTitle style={subtitleStyle}>
						<a href={website} rel="noopener noreferrer" target="_blank">
							{website.replace(/(^\w+:|^)\/\//, "")}
						</a>
					</SubTitle>
				) : (
					<MissingDetails>You haven&#39;t provided a website.</MissingDetails>
				)}
				<Info>Description:</Info>
				<div css="margin-bottom: 20px;">
					{description ? (
						<SubTitle style={subtitleStyle}>
							<MarkdownPreviewer>{description}</MarkdownPreviewer>
						</SubTitle>
					) : (
						<MissingDetails>
							You haven&#39;t included a description.
						</MissingDetails>
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
	website: PropTypes.string
};

export default Profile;
/* eslint-enable react/no-danger */
