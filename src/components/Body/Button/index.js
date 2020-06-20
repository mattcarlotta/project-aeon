/* eslint-disable react/button-has-type */
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = React.forwardRef(
  (
    {
      className,
      children,
      dataTestId,
      disabled,
      onBlur,
      onContextMenu,
      onClick,
      onFocus,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onTouchEnd,
      onTouchStart,
      style,
      type,
    },
    ref,
  ) => (
    <button
      ref={ref}
      aria-label="button"
      data-testid={dataTestId}
      className={className}
      disabled={disabled}
      onBlur={onBlur}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      onContextMenu={onContextMenu}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      style={style}
      tabIndex={0}
      type={type || "button"}
    >
      {children}
    </button>
  ),
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  type: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: "button",
  onClick: () => {},
};

export default styled(Button)`
  font-size: 16px;
  height: 100%;
  text-align: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || undefined};
  padding: ${({ padding }) => padding || "4px 16px"};
  font-weight: ${({ weight }) => weight || "normal"};
  border-radius: ${({ radius }) => radius || "50px"};
  margin: ${({ margin, centered }) => (centered ? "margin: 0 auto;" : margin)};
  ${props => {
    if (props.disabled)
      return "border:1px solid #ebebeb;background-color:#ebebeb;color:#bbb;";
    if (props.tertiary)
      return "border:1px solid #ddd;background-color:transparent;color:#ddd;";
    if (props.primary)
      return "border:1px solid #188fff;background-color:#188fff;color:#fff;";
    if (props.danger)
      return "border:1px solid #f0506e;background-color:transparent;color:#f0506e;";
    if (props.upvote)
      return `border: 0;background-color:transparent;color:${
        props.upvoted ? "#10e610" : props.overlay ? "#ccc" : "#000"
      }`;
    if (props.downvote)
      return `border: 0;background-color:transparent;color:${
        props.downvoted ? "#ff0000" : props.overlay ? "#ccc" : "#000"
      };`;
    if (props.plain)
      return "border: 0;background-color:transparent;color:#03a9f3;";
    if (props.alt || props.downvote || props.upvote)
      return "border: 0;background-color:transparent;color:#ddd;";
    if (props.link)
      return "border: 0;background-color:transparent;color:#000000a6;";
    return "border:1px solid #03a9f3;background-color:transparent;color:#03a9f3;";
  }};

  &:hover {
    ${props => {
      if (props.disabled)
        return "border-color:#ebebeb;background-color:#ebebeb;";
      if (props.tertiary) return "border-color:#fff;color:#fff;";
      if (props.primary)
        return "border-color:#0f7ae5;background-color:#0f7ae5;";
      if (props.danger)
        return "border-color:#ee395b;background-color:transparent;color:#ee395b;";
      if (props.plain) return "color:#0f7ae5;background-color: #ebebeb;";
      if (props.link) return "color:#40a9ff;";
      if (props.alt) return "color:#fff;";
      if (props.downvote) return "color: #ff0000;";
      if (props.upvote) return "color: #10e610;";
      return "border-color:#0f7ae5;background-color:transparent;color:#0f7ae5;";
    }};
  }
`;
