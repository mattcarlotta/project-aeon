import { PureComponent } from "react";
import PropTypes from "prop-types";
import { FaFlag, FaPencilAlt, FaShareAlt } from "react-icons/fa";
import {
  BsFillChatSquareDotsFill,
  BsFillChatSquareFill,
  BsFillTrash2Fill
} from "react-icons/bs";
import { IoIosRedo } from "react-icons/io";
import Button from "~components/Body/Button";
import toast from "~components/Body/Toast";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
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

class QCButtons extends PureComponent {
  handleDelete = async () => {
    try {
      const { handleStatusUpdate, id, type } = this.props;
      const res = await app.delete(`${type}/delete/${id}`);
      const data = parseData(res);

      toast({ type: "info", message: data.message });

      handleStatusUpdate(data);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  };

  handleRestore = async () => {
    try {
      const { handleStatusUpdate, id, type } = this.props;
      const res = await app.put(`${type}/restore/${id}`);
      const data = parseData(res);

      toast({ type: "info", message: data.message });

      handleStatusUpdate(data);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  };

  render = () => {
    const {
      collapseComments,
      comments,
      deleted,
      hasComments,
      handleEdit,
      handleShare,
      handleReport,
      isAuthor,
      isEditing,
      toggleComments
    } = this.props;

    return (
      <>
        {hasComments && !deleted && (
          <Button
            {...btnProps}
            onClick={!isEditing ? toggleComments : undefined}
          >
            {!collapseComments ? (
              <BsFillChatSquareDotsFill style={iconStyle} />
            ) : (
              <BsFillChatSquareFill style={iconStyle} />
            )}
            {round(comments)} Comment{comments > 1 && "s"}
          </Button>
        )}
        {isAuthor && (
          <Button {...btnProps} onClick={handleEdit}>
            <FaPencilAlt style={iconStyle} />
            Edit
          </Button>
        )}
        {!deleted ? (
          <>
            {isAuthor && (
              <Button {...btnProps} onClick={this.handleDelete}>
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
        ) : (
          <Button {...btnProps} onClick={this.handleRestore}>
            <IoIosRedo style={iconStyle} />
            Restore
          </Button>
        )}
      </>
    );
  };
}

QCButtons.propTypes = {
  comments: PropTypes.number,
  collapseComments: PropTypes.bool,
  deleted: PropTypes.bool,
  hasComments: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleReport: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleStatusUpdate: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAuthor: PropTypes.bool,
  isEditing: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  loggedInUserId: PropTypes.string,
  toggleComments: PropTypes.func,
  type: PropTypes.string.isRequired,
  uid: PropTypes.string
};

export default QCButtons;
