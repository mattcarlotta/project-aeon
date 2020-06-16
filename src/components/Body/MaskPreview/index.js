import { Component } from "react";
import PropTypes from "prop-types";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import Preview from "~components/Body/Preview";
import Gradient from "./Gradient";

class MaskPreview extends Component {
  state = {
    height: 0,
  };

  setMaskHeight = node => {
    this.mask = node;
    const height = this.mask ? this.mask.getBoundingClientRect().height : 0;

    this.setState({ height });
  };

  render = () => (
    <Gradient ref={this.setMaskHeight} height={this.state.height}>
      <Preview>
        <MarkdownPreviewer>{this.props.children}</MarkdownPreviewer>
      </Preview>
    </Gradient>
  );
}

MaskPreview.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default MaskPreview;
