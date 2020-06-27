import PropTypes from "prop-types";
import {
  FaComment,
  FaCommentSlash,
  FaFlag,
  FaPencilAlt,
  FaShareAlt
} from "react-icons/fa";
import { BsFillTrash2Fill } from "react-icons/bs";
import Button from "~components/Body/Button";
import round from "~utils/round";

const btnProps = {
  plain: true,
  fontSize: "12px",
  padding: "4px",
  margin: "0 2px 0 0",
  radius: "4px",
  weight: "bold",
  width: "auto"
};

const iconStyle = {
  position: "relative",
  top: 1,
  marginRight: 5,
  fontSize: 13
};

const QCButtons = ({
  collapseComments,
  comments,
  hasComments,
  handleEdit,
  handleDelete,
  handleShare,
  handleReport,
  isAuthor,
  isEditingComment,
  toggleComments
}) => (
  <>
    {hasComments && (
      <Button
        {...btnProps}
        onClick={!isEditingComment ? toggleComments : undefined}
      >
        {!collapseComments ? (
          <FaComment style={iconStyle} />
        ) : (
          <FaCommentSlash style={iconStyle} />
        )}
        {round(comments)} Comment{comments > 1 && "s"}
      </Button>
    )}
    {isAuthor && (
      <Button
        {...btnProps}
        onClick={!isEditingComment ? handleEdit : undefined}
      >
        <FaPencilAlt style={iconStyle} />
        Edit
      </Button>
    )}
    {isAuthor && (
      <Button {...btnProps} onClick={handleDelete}>
        <BsFillTrash2Fill style={iconStyle} />
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
  isAuthor: PropTypes.bool,
  isEditingComment: PropTypes.bool,
  loggedInUserId: PropTypes.string,
  toggleComments: PropTypes.func,
  uid: PropTypes.string
};

export default QCButtons;
