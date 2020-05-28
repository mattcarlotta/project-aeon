import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import GlobalStylesheet from "~styles/globalStylesheet";
import { signin } from "~actions/Authentication";
import { resetMessage } from "~actions/Messages";
import Wrapper from "~components/Body/Wrapper";
import toast from "~components/Body/Toast";
import Header from "~components/Navigation/Header";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { version } from "../../package.json";
import "~styles/global.scss";

export class MyApp extends App {
	static getInitialProps = async ({ Component, ctx }) => {
		const {
			store: { dispatch, getState },
			req
		} = ctx;
		const { isLoading, role } = getState().authentication;

		dispatch(resetMessage());

		if (isLoading && !role) {
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
				<Header />
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
				<GlobalStylesheet />
				<ToastContainer
					position="top-right"
					autoClose={2500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>
			</>
		);
	}
}

export default wrapper.withRedux(MyApp);
// export default MyApp;
