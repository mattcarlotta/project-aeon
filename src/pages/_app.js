import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import get from "lodash/get";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { ToastContainer } from "react-toastify";
import configureStore from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import Wrapper from "~components/Body/Wrapper";
import Header from "~components/Body/Header";
import { authenticateUser } from "~actions/Users";
import "~styles/empty.css";

export class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const cookie = get(ctx, ["req", "headers", "cookie"]);
		const { email } = ctx.store.getState().users;

		if (!email) {
			await ctx.store.dispatch(
				authenticateUser(cookie ? { headers: { cookie } } : undefined),
			);
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
		const { Component, pageProps, store } = this.props;
		return (
			<Provider store={store}>
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
			</Provider>
		);
	}
}

export default withRedux(configureStore, { debug: false })(
	withReduxSaga(MyApp),
);
