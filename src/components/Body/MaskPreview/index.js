import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import Gradient from "./Gradient";

const MaskPreview = ({
  fallback,
  children,
  maxHeight,
  maskHeight,
  minHeight
}) => {
  const [height, setHeight] = useState(0);

  const setMaskHeight = useCallback(
    node =>
      setHeight(prevState =>
        node ? Math.ceil(node.getBoundingClientRect().height) : prevState
      ),
    [setHeight]
  );

  return (
    <Gradient
      ref={setMaskHeight}
      height={height}
      maxHeight={maxHeight}
      maskHeight={maskHeight}
      minHeight={minHeight}
    >
      <Preview centered={!children}>
        <MarkdownPreviewer>{children || fallback}</MarkdownPreviewer>
      </Preview>
    </Gradient>
  );
};

MaskPreview.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  maxHeight: PropTypes.number,
  maskHeight: PropTypes.number,
  minHeight: PropTypes.number
};

MaskPreview.defaultProps = {
  maxHeight: 250,
  maskHeight: 10,
  minHeight: 1
};

export default MaskPreview;
