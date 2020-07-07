/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import MissingDetails from "~components/Body/MissingDetails";
import Preview from "~components/Body/Preview";
import SubTitle from "~components/Body/SubTitle";
import UpdateDescription from "~containers/Forms/UpdateDescription";

const Profile = ({
  username,
  description,
  firstname,
  lastname,
  showProfileForm,
  toggleProfileForm,
  website
}) => (
  <>
    {showProfileForm ? (
      <UpdateDescription
        firstname={firstname}
        lastname={lastname}
        website={website}
        description={description}
        username={username}
        showProfileForm={showProfileForm}
        closeForm={toggleProfileForm}
      />
    ) : (
      <>
        <div css="margin-bottom: 20px;">
          {description ? (
            <SubTitle style={{ padding: "5px 10px" }}>
              <Preview style={{ marginBottom: 0 }}>
                <MarkdownPreviewer>{description}</MarkdownPreviewer>
              </Preview>
            </SubTitle>
          ) : (
            <MissingDetails>
              You haven&#39;t included a description.
            </MissingDetails>
          )}
        </div>
        <Button
          height="auto"
          radius="4px"
          width="200px"
          onClick={toggleProfileForm}
        >
          Update Profile
        </Button>
      </>
    )}
  </>
);

Profile.propTypes = {
  username: PropTypes.string,
  description: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  showProfileForm: PropTypes.bool.isRequired,
  toggleProfileForm: PropTypes.func.isRequired,
  website: PropTypes.string
};

export default Profile;
/* eslint-enable react/no-danger */
