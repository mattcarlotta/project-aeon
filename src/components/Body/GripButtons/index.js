import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import Flex from "~components/Body/Flex";
import FlexSpaceEvenly from "~components/Body/FlexSpaceEvenly";

const style = { height: "100%" };

const GripButtons = ({ cancelForm, submitText }) => (
  <Flex style={style}>
    <FlexSpaceEvenly style={style}>
      {cancelForm && (
        <>
          <Button cancel margin="0" radius="0px" onClick={cancelForm}>
            Cancel
          </Button>
          <div css="height: 25px;width: 4px; background: #ddd;" />
        </>
      )}
      <Button submit margin="0" radius="0px" type="submit">
        {submitText}
      </Button>
    </FlexSpaceEvenly>
  </Flex>
);

GripButtons.propTypes = {
  cancelForm: PropTypes.func,
  submitText: PropTypes.string.isRequired
};

export default GripButtons;
