/* istanbul ignore file */
import styled from "styled-components";
import PropTypes from "prop-types";
import { GoQuestion } from "react-icons/go";
import Tooltip from "~components/Body/Tooltip";

const Label = ({ className, name, label, style, tooltip }) => (
  <label className={className} style={style} htmlFor={name}>
    {label}
    {tooltip && (
      <span className="tooltip">
        <Tooltip title={tooltip}>
          <span>
            <GoQuestion />
          </span>
        </Tooltip>
      </span>
    )}
  </label>
);

Label.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  tooltip: PropTypes.string
};

export default styled(Label)`
  color: rgb(0, 0, 0, 0.65);
  display: block;
  margin-bottom: 5px;
  font-size: 16px;

  & .tooltip {
    margin-left: 5px;

    svg {
      font-size: 16px;
      color: #bbb !important;
      position: relative;
      top: 3px;
      left: 0;

      &:hover {
        color: #282c34 !important;
      }
    }
  }
`;
