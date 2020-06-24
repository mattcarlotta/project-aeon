import { Component } from "react";
import PropTypes from "prop-types";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import Gradient from "./Gradient";

class MaskPreview extends Component {
  state = {
    height: 0
  };

  setMaskHeight = node =>
    this.setState(prevState => ({
      height: node
        ? Math.ceil(node.getBoundingClientRect().height)
        : prevState.height
    }));

  render = () => (
    <Gradient
      ref={this.setMaskHeight}
      height={this.state.height}
      maxHeight={this.props.maxHeight}
      maskHeight={this.props.maskHeight}
      minHeight={this.props.minHeight}
    >
      <Preview centered={!this.props.children}>
        <MarkdownPreviewer>
          {this.props.children || this.props.fallback}
        </MarkdownPreviewer>
      </Preview>
    </Gradient>
  );
}

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
