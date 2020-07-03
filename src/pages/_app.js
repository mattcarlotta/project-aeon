/* eslint-disable react/forbid-prop-types */
import { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import NProgress from "nprogress";
import { connect } from "react-redux";
import { signinOnLoad } from "~actions/Authentication";
import PageContainer from "~components/Body/PageContainer";
import NavBar from "~components/Navigation/NavBar";
import ServerMessages from "~containers/App/ServerMessages";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends Component {
  componentDidMount = () => {
    NProgress.configure({ showSpinner: false });

    Router.events.on("routeChangeComplete", this.scrollToTop);
    Router.events.on("routeChangeStart", this.startProgress);
    Router.events.on("routeChangeComplete", this.endProgress);
    Router.events.on("routeChangeError", this.endProgress);

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);

    if (!this.props.role) this.props.signinOnLoad();
  };

  componentWillUnmount = () => {
    Router.events.off("routeChangeComplete", this.scrollToTop);
    Router.events.off("routeChangeStart", this.startProgress);
    Router.events.off("routeChangeComplete", this.endProgress);
    Router.events.off("routeChangeError", this.endProgress);
  };

  scrollToTop = () => window.scrollTo(0, 0);

  startProgress = () => NProgress.start();

  endProgress = () => NProgress.done();

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStylesheet />
        <NavBar />
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
        <ServerMessages />
      </>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
  role: PropTypes.string,
  signinOnLoad: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication }) => ({
  role: authentication.role
});

const mapDispatchToProps = {
  signinOnLoad
};

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
/* eslint-enable react/forbid-prop-types */
