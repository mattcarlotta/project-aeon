import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const ClickHandler = ({ children }) => {
  const wrapperRef = useRef();
  const [isFocused, setFocus] = useState(false);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (
        isFocused &&
        wrapperRef.current &&
        wrapperRef.current.contains(target)
      )
        handleBlur();
    },
    [handleBlur, isFocused, wrapperRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span ref={wrapperRef}>
      {children({
        isFocused,
        handleBlur,
        handleFocus
      })}
    </span>
  );
};

ClickHandler.propTypes = {
  children: PropTypes.func.isRequired
};

export default ClickHandler;
