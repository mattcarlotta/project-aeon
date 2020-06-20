import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";

class ClickHandler extends Component {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.router;
    const { pathname: prevPathname } = prevProps.router;
    const { isVisible } = this.state;

    if (pathname !== prevPathname && isVisible) this.handleMenuClose();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = ({ target }) => {
    if (
      this.state.isVisible &&
      this.wrapperRef &&
      !this.wrapperRef.contains(target)
    ) {
      this.handleMenuClose();
    }
  };

  handleMenuClose = () => this.setState({ isVisible: false });

  handleMenuClick = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  render = () => (
    <div
      data-testid="dropdown-clickhandler"
      ref={node => (this.wrapperRef = node)}
    >
      {this.props.children({
        isVisible: this.state.isVisible,
        handleMenuClick: this.handleMenuClick,
      })}
    </div>
  );
}

ClickHandler.propTypes = {
  children: PropTypes.func.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(ClickHandler);
