import { IoIosRedo } from "react-icons/io";

const iconStyle = {
  position: "relative",
  top: 1,
  marginRight: 5,
  fontSize: 13
};

const DeletedMessage = () => (
  <p css="color: #000;font-weight: 300;background-color: #fff1eb;padding: 5px;text-align:center;border-radius: 4px;">
    This question is <strong>hidden</strong> from the public. If you change your
    mind, click the{" "}
    <strong>
      <IoIosRedo style={iconStyle} />
      restore
    </strong>{" "}
    button.
  </p>
);

export default DeletedMessage;
