import PropTypes from "prop-types";
import {
  FaComment,
  FaCommentSlash,
  FaEraser,
  FaFlag,
  FaPencilAlt,
  FaShareAlt
} from "react-icons/fa";
import Button from "~components/Body/Button";
import round from "~utils/round";

const btnProps = {
  plain: true,
  fontSize: "12px",
  padding: "4px",
  margin: "0 2px 0",
  radius: "4px",
  width: "auto"
};

const iconStyle = {
  position: "relative",
  top: 1,
  marginRight: 5,
  fontSize: 12
};

const QCButtons = ({
  collapseComments,
  comments,
  hasComments,
  handleEdit,
  handleDelete,
  handleShare,
  handleReport,
  isEditingComment,
  loggedInUserId,
  toggleComments,
  uid
}) => (
  <>
    {hasComments && (
      <Button
        {...btnProps}
        onClick={!isEditingComment ? toggleComments : undefined}
      >
        {!collapseComments ? (
          <FaCommentSlash style={iconStyle} />
        ) : (
          <FaComment style={iconStyle} />
        )}
        {collapseComments ? "Show" : "Hide"} {round(comments)} comment(s)
      </Button>
    )}
    {loggedInUserId === uid && !isEditingComment && (
      <Button {...btnProps} onClick={handleEdit}>
        <FaPencilAlt style={iconStyle} />
        Edit
      </Button>
    )}
    {loggedInUserId === uid && !isEditingComment && (
      <Button {...btnProps} onClick={handleDelete}>
        <FaEraser style={iconStyle} />
        Delete
      </Button>
    )}
    <Button {...btnProps} onClick={handleShare}>
      <FaShareAlt style={iconStyle} />
      Share
    </Button>
    <Button {...btnProps} onClick={handleReport}>
      <FaFlag style={iconStyle} />
      Report
    </Button>
  </>
);

QCButtons.propTypes = {
  comments: PropTypes.number,
  collapseComments: PropTypes.bool,
  hasComments: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReport: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  isEditingComment: PropTypes.bool,
  loggedInUserId: PropTypes.string,
  toggleComments: PropTypes.func,
  uid: PropTypes.string
};

export default QCButtons;
