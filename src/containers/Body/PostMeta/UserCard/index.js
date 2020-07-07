import PropTypes from "prop-types";
import Flex from "~components/Body/Flex";
import MaskPreview from "~components/Body/MaskPreview";
import UserRep from "~components/Body/UserRep";
import Website from "~components/Body/Website";
import Link from "~components/Navigation/Link";
import DefaultAvatar from "~images/defaultAvatar.png";
import UserContainer from "../UserContainer";

const UserCard = ({ avatar, description, username, reputation, website }) => (
  <UserContainer>
    <Flex justify="left">
      <img
        css="max-height: 55px;max-width:55px;display: block;margin-right: 10px;"
        src={avatar || DefaultAvatar}
        alt="avatar.png"
      />
      <div css="display: flex;flex-direction: column;align-items: flex-start;overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap;">
        <Link
          blue
          margin="2px 0"
          stopPropagation
          href="/u/[id]"
          asHref={`/u/${username}`}
        >
          <div css="font-size: 16px;">{username}</div>
        </Link>
        {website && <Website href={website} />}
        <UserRep reputation={reputation} />
      </div>
    </Flex>
    <MaskPreview
      maxHeight={80}
      maskHeight={35}
      minHeight={80}
      fallback="This user hasn't provided a description."
    >
      {description}
    </MaskPreview>
  </UserContainer>
);

UserCard.propTypes = {
  avatar: PropTypes.string,
  description: PropTypes.string,
  reputation: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  website: PropTypes.string
};

export default UserCard;
