import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { signin } from "~actions/Authentication";
import { resetMessages } from "~actions/Messages";
import toast from "~components/Body/Toast";
import PageContainer from "~components/Body/PageContainer";
import NavBar from "~components/Navigation/NavBar";
import ServerMessages from "~containers/App/ServerMessages";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { version } from "../../package.json";
import "~styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends App {
	static getInitialProps = async ({ Component, ctx }) => {
		const {
			store: { dispatch, getState },
			req
		} = ctx;
		const { role } = getState().authentication;

		dispatch(resetMessages());

		if (!role) {
			try {
				const res = await app.get("users/signedin", parseCookie(req));
				const data = parseData(res);

				dispatch(signin(data));
			} catch (e) {
				return { serverError: e.toString() };
			}
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
		NProgress.configure({
			showSpinner: false
		});

		Router.events.on("routeChangeComplete", this.scrollToTop);
		Router.events.on("routeChangeStart", this.startProgress);
		Router.events.on("routeChangeComplete", this.endProgress);
		Router.events.on("routeChangeError", this.endProgress);

		if (this.props.serverError)
			toast({ type: "error", message: this.props.serverError });

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
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					<meta
						name="description"
						content="Official website for... something."
					/>
					<meta name="build version" content={`${version}`} />
					<link rel="icon" href="/favicon.ico" />
				</Head>
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
