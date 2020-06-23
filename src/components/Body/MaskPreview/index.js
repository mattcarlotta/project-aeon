import { Component } from "react";
import PropTypes from "prop-types";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import Gradient from "./Gradient";

class MaskPreview extends Component {
  state = {
    height: 0,
  };

  setMaskHeight = node =>
    this.setState(prevState => ({
      height: node
        ? Math.ceil(node.getBoundingClientRect().height)
        : prevState.height,
    }));

  render = () => (
    <Gradient
      ref={this.setMaskHeight}
      height={this.state.height}
      maxHeight={this.props.maxHeight}
      maskHeight={this.props.maskHeight}
    >
      <Preview>
        <MarkdownPreviewer>{this.props.children}</MarkdownPreviewer>
      </Preview>
    </Gradient>
  );
}

MaskPreview.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  maxHeight: PropTypes.number,
  maskHeight: PropTypes.number,
};

MaskPreview.defaultProps = {
  maxHeight: 250,
  maskHeight: 10,
};

export default MaskPreview;
