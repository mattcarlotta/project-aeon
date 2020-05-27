import React from "react";
import App from "next/app";
import Head from "next/head";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import GlobalStylesheet from "~styles/globalStylesheet";
import Wrapper from "~components/Body/Wrapper";
import { resetMessage } from "~actions/Users";
import { wrapper } from "~store";
import { version } from "../../package.json";
import toast from "~components/Body/Toast";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends App {
	componentDidMount = () => {
		NProgress.configure({
			showSpinner: false,
		});

		Router.events.on("routeChangeComplete", this.scrollToTop);
		Router.events.on("routeChangeStart", this.startProgress);
		Router.events.on("routeChangeComplete", this.endProgress);
		Router.events.on("routeChangeError", this.endProgress);

		const { serverError } = this.props;
		if (serverError) toast({ type: "error", message: serverError });
	};

	componentWillUnmount = () => {
		Router.events.off("routeChangeComplete", this.scrollToTop);
		Router.events.off("routeChangeStart", this.startProgress);
		Router.events.off("routeChangeComplete", this.endProgress);
		Router.events.off("routeChangeError", this.endProgress);
	};

	static async getInitialProps({ Component, ctx }) {
		const {
			store: { dispatch, getState },
			req,
		} = ctx;
		const { isLoading, role } = getState().users;

		dispatch(resetMessage());

		if (isLoading && !role) {
			try {
				const res = app.get("users/signedin", parseCookie(req));
				const data = parseData(res);

				dispatch(actions.signin(data));
			} catch (e) {
				return { serverError: e.toString() };
			}
		}

		return {
			pageProps: {
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		};
	}

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
