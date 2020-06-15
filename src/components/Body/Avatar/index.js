import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Tooltip from "~components/Body/Tooltip";
import DefaultAvatar from "~images/defaultAvatar.png";

const Avatar = ({ deleteUserAvatar, settings, toggleImageForm }) => (
  <>
    <img
      css="max-height: 200px;max-width:200px;margin: 0 auto;display: block;"
      src={settings.avatar || DefaultAvatar}
      alt="avatar.png"
    />
    <div css="width: 100%; margin-left: auto;margin-right: auto; margin-top: 2px;">
      <Tooltip placement="top" title="Change Avatar">
        <Button
          type="button"
          style={{
            maxWidth: 100,
            marginTop: 5,
          }}
          onClick={toggleImageForm}
        >
          Change
        </Button>
      </Tooltip>
      {settings.avatar && (
        <Tooltip placement="top" title="Delete Avatar">
          <Button
            danger
            type="button"
            style={{
              maxWidth: 100,
              marginTop: 5,
              marginLeft: 20,
            }}
            onClick={deleteUserAvatar}
          >
            Delete
          </Button>
        </Tooltip>
      )}
    </div>
  </>
);

Avatar.propTypes = {
  deleteUserAvatar: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    registered: PropTypes.string,
    reputation: PropTypes.number,
    username: PropTypes.string,
    website: PropTypes.string,
  }),
  toggleImageForm: PropTypes.func.isRequired,
};

export default Avatar;
