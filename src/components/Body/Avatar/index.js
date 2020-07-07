import { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteUserAvatar } from "~actions/Authentication";
import Button from "~components/Body/Button";
import Tooltip from "~components/Body/Tooltip";
import DefaultAvatar from "~images/defaultAvatar.png";

const Avatar = ({ avatar, toggleImageForm }) => {
  const dispatch = useDispatch();
  const deleteUserAvatarAction = useCallback(
    () => dispatch(deleteUserAvatar),
    []
  );

  return (
    <>
      <img
        css="max-height: 200px;max-width:200px;margin: 0 auto;display: block;"
        src={avatar || DefaultAvatar}
        alt="avatar.png"
      />
      <div css="width: 100%; margin-left: auto;margin-right: auto; margin-top: 2px;">
        <Tooltip title="Change Avatar">
          <Button
            type="button"
            style={{
              maxWidth: 100,
              marginTop: 5
            }}
            onClick={toggleImageForm}
          >
            Change
          </Button>
        </Tooltip>
        {avatar && (
          <Tooltip title="Delete Avatar">
            <Button
              danger
              type="button"
              style={{
                maxWidth: 100,
                marginTop: 5,
                marginLeft: 20
              }}
              onClick={deleteUserAvatarAction}
            >
              Delete
            </Button>
          </Tooltip>
        )}
      </div>
    </>
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
  toggleImageForm: PropTypes.func.isRequired
};

export default Avatar;
