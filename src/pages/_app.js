import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { signinOnLoad } from "~actions/Authentication";
import { resetMessages } from "~actions/Messages";
import PageContainer from "~components/Body/PageContainer";
import NavBar from "~components/Navigation/NavBar";
import ServerMessages from "~containers/App/ServerMessages";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import { parseCookie } from "~utils/parse";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const {
      store: { dispatch, getState, sagaTask },
      req
    } = ctx;
    const { role } = getState().authentication;

    dispatch(resetMessages());

    if (!role) {
      dispatch(signinOnLoad(parseCookie(req)));
      await sagaTask.toPromise();
    }

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  };

  componentDidMount = () => {
    NProgress.configure({ showSpinner: false });

    Router.events.on("routeChangeComplete", this.scrollToTop);
    Router.events.on("routeChangeStart", this.startProgress);
    Router.events.on("routeChangeComplete", this.endProgress);
    Router.events.on("routeChangeError", this.endProgress);

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
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

export default wrapper.withRedux(MyApp);
// export default MyApp;
