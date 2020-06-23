import PropTypes from "prop-types";
import { toast } from "react-toastify";
import AlertContainer from "./AlertContainer";
import AlertIcon from "./AlertIcon";
import AlertMessage from "./AlertMessage";

const ToastMessage = ({ type, message }) =>
  toast[type](
    <AlertContainer type={type} data-testid="modal-alert">
      <AlertIcon type={type} />
      <AlertMessage data-testid="modal-message">{message}</AlertMessage>
    </AlertContainer>,
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToastMessage;
