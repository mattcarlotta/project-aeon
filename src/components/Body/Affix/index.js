import { Component, createRef } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import scrollObserver, { unbind } from "./utils/scrollObserver";
import getOffset from "./utils/getOffset";

class Affix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: null,
      fixed: false,
    };

    this.mountRef = createRef();
  }

  componentDidMount() {
    this.updateMountNodeOffset();
    document.addEventListener("scroll", this.updatePosition);
    scrollObserver(this.mountRef.current, this.updateMountNodeOffset);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.updatePosition);
    if (this.mountRef.current) unbind(this.mountRef.current);
  }

  updateMountNodeOffset = () =>
    this.setState({ offset: getOffset(this.mountRef.current) });

  updatePosition = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const fixed = scrollY - (this.state.offset.top - this.props.top) >= 0;

    if (fixed !== this.state.fixed) {
      this.setState({ fixed }, () => this.props.onChange(this.state.fixed));
    }
  };

  render = () => (
    <div data-test-id="affix-container" ref={this.mountRef}>
      <Container {...this.state} {...this.props}>
        {this.props.children}
      </Container>
      {this.state.fixed && (
        <div
          data-testid="affix-placeholder"
          style={{
            width: this.state.offset.width,
            height: this.state.offset.height,
          }}
        />
      )}
    </div>
  );
}

Affix.propTypes = {
  top: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Affix.defaultProps = {
  onChange: () => {},
  top: 0,
};

export default Affix;
