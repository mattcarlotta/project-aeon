/* eslint-disable react/forbid-prop-types */
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import NProgress from "nprogress";
import { useSelector, useDispatch } from "react-redux";
import { signinOnLoad } from "~actions/Authentication";
import PageContainer from "~components/Body/PageContainer";
import NavBar from "~components/Navigation/NavBar";
import ServerMessages from "~containers/App/ServerMessages";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import "react-toastify/dist/ReactToastify.css";

export const App = ({ Component, pageProps }) => {
  const role = useSelector(({ authentication }) => authentication.role);
  const dispatch = useDispatch();

  const scrollToTop = useCallback(() => window.scrollTo(0, 0));
  const startProgress = useCallback(() => NProgress.start());
  const endProgress = useCallback(() => NProgress.done());

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    Router.events.on("routeChangeComplete", scrollToTop);
    Router.events.on("routeChangeStart", startProgress);
    Router.events.on("routeChangeComplete", endProgress);
    Router.events.on("routeChangeError", endProgress);

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);

    if (!role) dispatch(signinOnLoad());

    return () => {
      Router.events.off("routeChangeComplete", scrollToTop);
      Router.events.off("routeChangeStart", startProgress);
      Router.events.off("routeChangeComplete", endProgress);
      Router.events.off("routeChangeError", endProgress);
    };
  }, []);

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
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
  role: PropTypes.string
};

export default wrapper.withRedux(App);
/* eslint-enable react/forbid-prop-types */
