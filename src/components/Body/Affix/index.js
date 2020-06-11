import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { getOffset } from "dom-lib";
import bindElementResize, {
  unbind as unbindElementResize,
} from "element-resize-event";
import Container from "./Container";

class Affix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: null,
      fixed: false,
      containerOffset: null,
    };
    this.mountRef = createRef();
  }

  componentDidMount() {
    this.updateMountNodeOffset();
    document.addEventListener("scroll", this.updatePosition);
    bindElementResize(this.mountRef.current, this.updateMountNodeOffset);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.updatePosition);

    if (this.mountRef.current) {
      unbindElementResize(this.mountRef.current);
    }
  }

  getContainerOffset = () => {
    const { container } = this.props;
    const { containerOffset: offset } = this.state;
    if (offset) {
      return offset;
    }

    const node = typeof container === "function" ? container() : container;
    const containerOffset = node ? getOffset(node) : null;
    this.setState({ containerOffset });

    return containerOffset;
  };

  updateMountNodeOffset = () =>
    this.setState({ offset: getOffset(this.mountRef.current) });

  updatePosition = () => {
    const { offset } = this.state;
    const { top, onChange } = this.props;
    const scrollY = window.scrollY || window.pageYOffset;
    const containerOffset = this.getContainerOffset();
    let fixed = scrollY - (offset.top - top) >= 0;

    if (containerOffset) {
      fixed = fixed && scrollY < containerOffset.top + containerOffset.height;
    }

    if (fixed !== this.state.fixed) {
      this.setState({ fixed }, () => onChange(this.state.fixed));
    }
  };

  render() {
    return (
      <div ref={this.mountRef}>
        <Container {...this.state} {...this.props}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

Affix.propTypes = {
  top: PropTypes.number,
  onChange: PropTypes.func,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Affix.defaultProps = {
  onChange: () => {},
  top: 0,
};

export default Affix;
