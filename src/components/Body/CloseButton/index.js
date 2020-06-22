import PropTypes from "prop-types";
import { FaRegTimesCircle } from "react-icons/fa";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";

const CloseButton = ({ onClick }) => (
  <Center>
    <Button
      downvote
      overlay
      padding="0px 6px"
      margin="0"
      width="68px"
      onClick={onClick}
    >
      <FaRegTimesCircle
        style={{
          fontSize: 14,
          position: "relative",
          top: 2,
          marginRight: 5,
        }}
      />
      <span css="font-size: 14px;">Close</span>
    </Button>
  </Center>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
