import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "~reducers";
import rootSaga from "~sagas";

const makeStore = initialState => {
	const saga = createSagaMiddleware();

	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(saga)),
	);

	store.sagaTask = saga.run(rootSaga);

	return store;
};

export default makeStore;
